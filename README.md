# Pokemon Champions Battle Desk — Public Edition

브라우저에서 바로 사용하는 **Pokemon Champions Battle Desk**의 GitHub Pages 배포용 버전입니다.

## 기능

- 서로 완전히 독립된 좌·우 스플릿 뷰
- 한글/영문 즉시 검색 및 Enter 검색
- 기본 폼 사용률 TOP 100 홈 화면
- 종족값, 방어 상성, 채용 기술 TOP 10, 도구 TOP 5
- 성격·노력치·구애스카프·랭크 보정을 반영하는 스피드 계산기
- 대표 포켓몬 배너 및 브라우저 뒤로가기 URL 상태 복원

## 데이터 출처 및 준수 사항

이 프로젝트는 비공식 팬 프로젝트이며 Nintendo, Creatures, GAME FREAK과 관계가 없습니다.

- 배틀 데이터: [Pokemon Champions Battle Data](https://championsbattledata.com/) — 페이지 하단에 필수 출처 표기를 포함합니다. 제공자의 [API Rules](https://championsbattledata.com/api-rules/) 및 [License](https://championsbattledata.com/license)를 준수하며, 데이터를 영구 미러·아카이브·독립 API로 재배포하지 않습니다.
- 포켓몬 한글명 및 기술/도구 현지화: [PokéAPI](https://pokeapi.co/) — 해당 프로젝트의 [BSD-3-Clause License](https://github.com/PokeAPI/pokeapi/blob/master/LICENSE.md)를 따릅니다.
- 앱 소스 코드: [MIT License](LICENSE), © 2026 [ISOMER-K](https://github.com/ISOMER-K).

배포하거나 포크할 때도 위 출처 표기와 비공식 프로젝트 고지를 유지해 주세요.

## 구조

```text
ChampionsBattleDeskPublic/
├── index.html      # 화면과 하단 출처 표기
├── style.css       # 반응형 2패널 UI
├── app.js          # 실시간 API 요청 및 인터랙션
├── .nojekyll       # GitHub Pages 정적 제공 설정
└── LICENSE         # 이 저장소 코드의 MIT 라이선스
```
