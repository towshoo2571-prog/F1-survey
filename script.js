
const questions = [
  {
    title: "1. F1에 대해 얼마나 알고 있나요?",
    options: [
      "F1 경기를 자주 시청하고 잘 알고 있다.",
      "F1을 알고 있으며 가끔 시청한다.",
      "이름은 들어봤지만 자세히 알지 못한다.",
      "F1에 대해 거의 알지 못한다."
    ]
  },
  {
    title: "2. F1에서 가장 관심이 있는 부분은 무엇인가요?",
    options: [
      "드라이버의 운전 실력과 경기 전략",
      "자동차의 속도와 기술",
      "팀 브랜드와 팀 간 경쟁",
      "드라이버의 인기와 개인적인 이미지",
      "경기 결과와 월드 챔피언십"
    ]
  },
  {
    title: "3. F1 월드 챔피언이 되는 데 가장 중요한 요소는?",
    options: [
      "드라이버 개인의 운전 실력",
      "자동차의 성능과 기술력",
      "팀의 전략과 경기 운영",
      "드라이버와 팀의 협력",
      "운과 경기 상황"
    ]
  },
  {
    title: "4. 드라이버의 실력과 자동차 성능 중 어느 쪽이 더 중요할까요?",
    options: [
      "드라이버의 실력이 훨씬 더 중요하다.",
      "드라이버의 실력이 조금 더 중요하다.",
      "두 요소가 비슷하게 중요하다.",
      "자동차의 성능이 조금 더 중요하다.",
      "자동차의 성능이 훨씬 더 중요하다."
    ]
  },
  {
    title: "5. 서로 다른 팀에 소속되어도 같은 드라이버가 월드 챔피언이 될 수 있을까요?",
    options: [
      "매우 그렇다.",
      "그렇다.",
      "보통이다.",
      "그렇지 않다.",
      "전혀 그렇지 않다."
    ]
  },
  {
    title: "6. F1 팀을 선택할 때 가장 중요한 것은?",
    options: [
      "팀의 우승 기록",
      "좋아하는 드라이버",
      "자동차의 성능",
      "팀 브랜드의 이미지와 역사",
      "팀의 경기 전략",
      "특별히 중요하게 생각하는 기준이 없다."
    ]
  },
  {
    title: "7. 가장 관심 있는 드라이버는 누구인가요?",
    options: [
      "막스 페르스타펀 (Max Verstappen)",
      "랜도 노리스 (Lando Norris)",
      "안드레아 키미 안토넬리 (Andrea Kimi Antonelli)",
      "다른 드라이버",
      "특별히 관심 있는 드라이버가 없다."
    ]
  },
  {
    title: "8. 드라이버가 다른 팀으로 이적하면 월드 챔피언이 될 가능성도 달라질까요?",
    options: [
      "매우 그렇다.",
      "그렇다.",
      "보통이다.",
      "그렇지 않다.",
      "전혀 그렇지 않다."
    ]
  }
];

const questionsDiv = document.getElementById("questions");

questions.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question";

  let html = `<h3>${q.title}</h3>`;

  q.options.forEach((option, i) => {
    html += `
      <label class="option">
        <input type="radio" name="q${index + 1}"
        value="${i + 1}" required>
        ${i + 1}. ${option}
      </label>
    `;
  });

  div.innerHTML = html;
  questionsDiv.appendChild(div);
});

// 9번 자유 응답
questionsDiv.innerHTML += `
  <div class="question">
    <h3>9. F1 월드 챔피언이 되기 위해 가장 중요하다고 생각하는 이유를 작성해 주세요.</h3>
    <textarea id="answer9"
      placeholder="자유롭게 작성해 주세요..."
      required></textarea>
  </div>
`;

let results = [];

document.getElementById("surveyForm")
.addEventListener("submit", function(e) {
  e.preventDefault();

  const answers = [];

  for (let i = 1; i <= 8; i++) {
    const selected = document.querySelector(
      `input[name="q${i}"]:checked`
    );

    if (!selected) {
      alert(`${i}번 질문에 답해주세요.`);
      return;
    }

    answers.push(selected.value);
  }

  const answer9 = document.getElementById("answer9").value.trim();

  if (!answer9) {
    alert("9번 질문에 답해주세요.");
    return;
  }

  answers.push(answer9);
  results.push(answers);

  document.getElementById("message").textContent =
    "설문에 참여해 주셔서 감사합니다!";

  document.getElementById("surveyForm").reset();
  document.getElementById("downloadBtn").hidden = false;
});

document.getElementById("downloadBtn")
.addEventListener("click", function() {
  const header = [
    "Q1", "Q2", "Q3", "Q4", "Q5",
    "Q6", "Q7", "Q8", "Q9"
  ];

  const csv = [
    header,
    ...results
  ].map(row =>
    row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(",")
  ).join("\n");

  const blob = new Blob(
    ["\uFEFF" + csv],
    { type: "text/csv;charset=utf-8;" }
  );

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "F1_survey_results.csv";
  link.click();

  URL.revokeObjectURL(link.href);
});
