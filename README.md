# Pokemon Champions Battle Desk — Public Edition

브라우저에서 바로 사용하는 **Pokemon Champions Battle Desk**의 GitHub Pages 배포용 버전입니다.

## 핵심 차이

- 배틀 통계 JSON을 저장하거나 배포하지 않습니다.
- 페이지를 열 때 [Pokemon Champions Battle Data](https://championsbattledata.com/) API의 인덱스를 실시간으로 요청합니다.
- 포켓몬 상세 화면은 선택한 포켓몬의 싱글 배틀 데이터를 그때그때 요청합니다.
- 한글 포켓몬명, 기술명, 도구명은 [PokéAPI](https://pokeapi.co/)의 공개 API/원본 CSV에서 브라우저가 가져옵니다.
- 따라서 API가 일시적으로 응답하지 않으면 해당 정보도 표시할 수 없습니다. 이것은 최신성 및 데이터 제공 조건을 지키기 위한 설계입니다.

## 기능

- 서로 완전히 독립된 좌·우 스플릿 뷰
- 한글/영문 즉시 검색 및 Enter 검색
- 기본 폼 사용률 TOP 100 홈 화면
- 종족값, 방어 상성, 채용 기술 TOP 10, 도구 TOP 5
- 성격·노력치·구애스카프·랭크 보정을 반영하는 스피드 계산기
- 대표 포켓몬 배너 및 브라우저 뒤로가기 URL 상태 복원

## 로컬에서 미리 보기

정적 사이트라 별도 패키지 설치가 필요 없습니다. 이 폴더에서 간단한 웹 서버만 실행하면 됩니다.

```bash
cd /Users/kdh/Documents/PKMN/ChampionsBattleDeskPublic
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다. `file://`로 직접 열기보다 위 방식이 API 요청과 브라우저 보안 정책에 안정적입니다.

## GitHub Pages 배포

1. 이 `ChampionsBattleDeskPublic` 폴더만 별도 GitHub 저장소의 루트로 올립니다.
2. GitHub 저장소의 **Settings → Pages**에서 `Deploy from a branch`를 선택합니다.
3. 배포 브랜치와 `/ (root)`를 선택해 저장합니다.
4. 안내되는 `https://ISOMER-K.github.io/<repository>/` 주소를 열면 됩니다.

`.nojekyll` 파일이 들어 있으므로 GitHub Pages가 정적 파일을 그대로 제공합니다. 서버, 데이터베이스, API 키, 빌드 과정은 필요하지 않습니다.

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
