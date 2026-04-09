    function qd() {
      return (window.QUIZ_LANGS && window.QUIZ_LANGS[currentLang])
          || (window.QUIZ_LANGS && window.QUIZ_LANGS['zh-CN'])
          || {};
    }

    const app = {
      shuffledQuestions: [],
      answers: {},
      previewMode: false
    };

    const screens = {
      intro: document.getElementById('intro'),
      test: document.getElementById('test'),
      result: document.getElementById('result')
    };

    const questionList = document.getElementById('questionList');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const submitBtn = document.getElementById('submitBtn');
    const testHint = document.getElementById('testHint');

    function showScreen(name) {
      Object.entries(screens).forEach(([key, el]) => {
        el.classList.toggle('active', key === name);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function shuffle(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function getVisibleQuestions() {
      const visible = [...app.shuffledQuestions];
      const gateIndex = visible.findIndex(q => q.id === 'drink_gate_q1');
      if (gateIndex !== -1 && app.answers['drink_gate_q1'] === 3) {
        visible.splice(gateIndex + 1, 0, qd().specialQuestions[1]);
      }
      return visible;
    }

    function getQuestionMetaLabel(q) {
      if (q.special) return t('extra_question');
      return app.previewMode ? qd().dimensionMeta[q.dim].name : t('dim_hidden');
    }

    function renderQuestions() {
      const visibleQuestions = getVisibleQuestions();
      questionList.innerHTML = '';
      visibleQuestions.forEach((q, index) => {
        const card = document.createElement('article');
        card.className = 'question';
        card.innerHTML = `
          <div class="question-meta">
            <div class="badge">${t('question_label', { n: index + 1 })}</div>
            <div>${getQuestionMetaLabel(q)}</div>
          </div>
          <div class="question-title">${q.text}</div>
          <div class="options">
            ${q.options.map((opt, i) => {
              const code = ['A', 'B', 'C', 'D'][i] || String(i + 1);
              const checked = app.answers[q.id] === opt.value ? 'checked' : '';
              return `
                <label class="option">
                  <input type="radio" name="${q.id}" value="${opt.value}" ${checked} />
                  <div class="option-code">${code}</div>
                  <div>${opt.label}</div>
                </label>
              `;
            }).join('')}
          </div>
        `;
        questionList.appendChild(card);
      });

      questionList.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', (e) => {
          const { name, value } = e.target;
          app.answers[name] = Number(value);

          if (name === 'drink_gate_q1') {
            if (Number(value) !== 3) {
              delete app.answers['drink_gate_q2'];
            }
            renderQuestions();
            return;
          }

          updateProgress();
        });
      });

      updateProgress();
    }

    function updateProgress() {
      const visibleQuestions = getVisibleQuestions();
      const total = visibleQuestions.length;
      const done = visibleQuestions.filter(q => app.answers[q.id] !== undefined).length;
      const percent = total ? (done / total) * 100 : 0;
      progressBar.style.width = `${percent}%`;
      progressText.textContent = `${done} / ${total}`;
      const complete = done === total && total > 0;
      submitBtn.disabled = !complete;
      testHint.textContent = complete ? t('hint_complete') : t('hint_incomplete');
    }

    function sumToLevel(score) {
      if (score <= 3) return 'L';
      if (score === 4) return 'M';
      return 'H';
    }

    function levelNum(level) {
      return { L: 1, M: 2, H: 3 }[level];
    }

    function parsePattern(pattern) {
      return pattern.replace(/-/g, '').split('');
    }

    function getDrunkTriggered() {
      return app.answers[qd().DRUNK_TRIGGER_QUESTION_ID] === 2;
    }

    function computeResult() {
      const rawScores = {};
      const levels = {};
      const { dimensionMeta, questions, dimensionOrder, NORMAL_TYPES, TYPE_LIBRARY } = qd();

      Object.keys(dimensionMeta).forEach(dim => { rawScores[dim] = 0; });

      questions.forEach(q => {
        rawScores[q.dim] += Number(app.answers[q.id] || 0);
      });

      Object.entries(rawScores).forEach(([dim, score]) => {
        levels[dim] = sumToLevel(score);
      });

      const userVector = dimensionOrder.map(dim => levelNum(levels[dim]));
      const ranked = NORMAL_TYPES.map(type => {
        const vector = parsePattern(type.pattern).map(levelNum);
        let distance = 0;
        let exact = 0;
        for (let i = 0; i < vector.length; i++) {
          const diff = Math.abs(userVector[i] - vector[i]);
          distance += diff;
          if (diff === 0) exact += 1;
        }
        const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
        return { ...type, ...TYPE_LIBRARY[type.code], distance, exact, similarity };
      }).sort((a, b) => {
        if (a.distance !== b.distance) return a.distance - b.distance;
        if (b.exact !== a.exact) return b.exact - a.exact;
        return b.similarity - a.similarity;
      });

      const bestNormal = ranked[0];
      const drunkTriggered = getDrunkTriggered();

      let finalType;
      let modeKicker = t('kicker_main');
      let badge = t('badge_normal', { sim: bestNormal.similarity, exact: bestNormal.exact });
      let sub = t('sub_normal');
      let special = false;
      let secondaryType = null;

      if (drunkTriggered) {
        finalType = TYPE_LIBRARY.DRUNK;
        secondaryType = bestNormal;
        modeKicker = t('kicker_drunk');
        badge = t('badge_drunk');
        sub = t('sub_drunk');
        special = true;
      } else if (bestNormal.similarity < 60) {
        finalType = TYPE_LIBRARY.HHHH;
        modeKicker = t('kicker_fallback');
        badge = t('badge_fallback', { sim: bestNormal.similarity });
        sub = t('sub_fallback');
        special = true;
      } else {
        finalType = bestNormal;
      }

      return {
        rawScores,
        levels,
        ranked,
        bestNormal,
        finalType,
        modeKicker,
        badge,
        sub,
        special,
        secondaryType
      };
    }

    function renderDimList(result) {
      const { dimensionOrder, DIM_EXPLANATIONS, dimensionMeta } = qd();
      const dimList = document.getElementById('dimList');
      dimList.innerHTML = dimensionOrder.map(dim => {
        const level = result.levels[dim];
        const explanation = DIM_EXPLANATIONS[dim][level];
        return `
          <div class="dim-item">
            <div class="dim-item-top">
              <div class="dim-item-name">${dimensionMeta[dim].name}</div>
              <div class="dim-item-score">${t('dim_score_label', { level, score: result.rawScores[dim] })}</div>
            </div>
            <p>${explanation}</p>
          </div>
        `;
      }).join('');
    }

    function renderResult() {
      const result = computeResult();
      const type = result.finalType;

      document.getElementById('resultModeKicker').textContent = result.modeKicker;
      document.getElementById('resultTypeName').textContent = `${type.code}（${type.cn}）`;
      document.getElementById('matchBadge').textContent = result.badge;
      document.getElementById('resultTypeSub').textContent = result.sub;
      document.getElementById('resultDesc').textContent = type.desc;
      document.getElementById('posterCaption').textContent = type.intro;
      document.getElementById('funNote').textContent = result.special
        ? t('fun_note_special')
        : t('fun_note_normal');

      const posterBox = document.getElementById('posterBox');
      const posterImage = document.getElementById('posterImage');
      const imageSrc = qd().TYPE_IMAGES[type.code];
      if (imageSrc) {
        posterImage.src = imageSrc;
        posterImage.alt = `${type.code}（${type.cn}）`;
        posterBox.classList.remove('no-image');
      } else {
        posterImage.removeAttribute('src');
        posterImage.alt = '';
        posterBox.classList.add('no-image');
      }

      renderDimList(result);
      showScreen('result');
    }

    function startTest(preview = false) {
      app.previewMode = preview;
      app.answers = {};
      const { questions, specialQuestions } = qd();
      const shuffledRegular = shuffle(questions);
      const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
      app.shuffledQuestions = [
        ...shuffledRegular.slice(0, insertIndex),
        specialQuestions[0],
        ...shuffledRegular.slice(insertIndex)
      ];
      renderQuestions();
      showScreen('test');
    }

    document.getElementById('startBtn').addEventListener('click', () => startTest(false));
    document.getElementById('backIntroBtn').addEventListener('click', () => showScreen('intro'));
    document.getElementById('submitBtn').addEventListener('click', renderResult);
    document.getElementById('restartBtn').addEventListener('click', () => startTest(false));
    document.getElementById('toTopBtn').addEventListener('click', () => showScreen('intro'));

    document.getElementById('langSelect').addEventListener('change', (e) => {
      currentLang = e.target.value;
      applyTranslations();
      // Re-render active dynamic content
      const testActive = document.getElementById('test').classList.contains('active');
      const resultActive = document.getElementById('result').classList.contains('active');
      if (testActive) {
        // Remap shuffled question objects to new language by ID
        const { questions: newQ, specialQuestions: newSQ } = qd();
        const allNewQ = [...newQ, ...newSQ];
        const byId = {};
        allNewQ.forEach(q => { byId[q.id] = q; });
        app.shuffledQuestions = app.shuffledQuestions.map(q => byId[q.id] || q);
        renderQuestions();
      }
      if (resultActive) renderResult();
    });

    // Apply initial translations on load
    applyTranslations();
