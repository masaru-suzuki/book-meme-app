# BOOK MEMO

読んだ本の情報や Udemy などで受けた講義の内容を忘れないようにしたいと思ってメモアプリを作成しようと思いました。
ただメモアプリだと面白みがないので、クイズを出題して復習効率を上げよと思いました。

まだ試作段階で機能とかは今後つけたしたりしていこうと考えていました。

## できること

- メモの登録
- 本の登録

## やりたいこと

- 忘却曲線に合わせて問題を出題できるようにする

## BD 構造

books にクイズの情報もまとめるか悩んだ。
クイズの stage を更新する際に重くなるかと思って分けた。第二階層まで検索をする必要がある
quiz の bookID を検索 => 本に登録されているクイズから quizID を検索 => stage 更新

一方 quizList に登録しているのであれば quizID から検索が可能。検索の幅が第一階層ですむ。
firebase の DB で複数階層に対して ID 検索ができるのであれば、本の情報をひとまとめにできる。
デメリットとしては、本ごとの出題をする場合、quiz 内の bookID で filter しなければならない

- books: 本の情報
- quizList: 本に紐づくクイズ
- schedule: 日毎に解くべきクイズを格納

## 忘却曲線の実装アイディア

- quiz に stage プロパティを設ける
- 問題をクリアしたら、stage を+1 する
- 問題をクリアしたら、2 の stage 乗後の schedule にクイズを登録
- 例えば、stage3 のクイズを正解した場合) 2 の 4 乗=8 日後の schedule に quiz を格納

## タスク

- クイズの制御
  - クイズの表示
  - クイズ解答後
    1. stage 更新
       stage を更新した際に stage の情報が入っているコンポーネントが再レンダリングされないようにする
       firebase への同期タイミングどうするか考える
    2. quizList にクイズを格納
       今日のクイズは全て確認できるようにする
       ただし今日のクイズの status は更新できないものとする
       isDone を flag にする
    3. 現在解答中のクイズを更新
    4. circle progress のステータスを更新
       クイズを答えた後に再度画面を開いても、その日の進捗状況が変わらないようにする
       例えば 30 問中 10 問解答して、画面を更新した場合
       OK) 11/30
       NG) 1/20
    5. 現在のクイズを切り替える
       swiper でフリックできるようにする？

## わからないこと

- firebase の更新タイミングどうするか。
  初回レンダリングの時に firebase のデータを store に格納するのはいいんだけど、state を更新するたびに firebase に push する必要があるのか？

- 初回レンダリング時に firebase から情報を取得して、初期化するのを TOP.jsx で行っていたが、コンポーネントに責任を持たせるのは良くない。そのため、redux に責任を持たせる必要がある。しかし、その場合、どこで初期化を行えばいいのかわからない。
- [memo](https://necessary-taker-024.notion.site/redex-e3449c397c5e4854a1567d8f84249bc8)

<hr>

## 佐川さん FB

### Redux を src/store に置く

- Redux はトップダウンな GlobalState 管理ツールなので、それぞれの場所からアクセスしやすいよう src 配下に置くのが望ましいです。

### LocalStorage を用いない

- LocalStorage を用いた場合 Redux と LocalStorage の二重管理から開発が苦しくなります。Single Source of Truth を心がけると良いです。
- ブラウザが異なった際に挙動が変わってしまったりするので firebase から値を読み取ったあとは基本的に Redux に任せるのが良いです。（現在 LocalStorage なのを追々置き換える想定なのかもしれませんね）
- loading を避けるために、localStorage に登録していたが、loading を発生させるほうが自然
- 参考**[【React × Redux Toolkit】createAsyncThunk を使って API を叩き、通信中はローディング画面を表示させる | 株式会社ロジカルスタジオ](https://www.wantedly.com/companies/logical-studio/post_articles/430941)**

### 初期の状態取得を redux に任せる

現在以下を用いて状態の取得をしていると思います。

```
// 非同期で書籍情報を取得（それまではlocalStorageのデータを表示)
  useEffect(() => {
    const init = async () => {
      const dbBooks = await fetchBookList();
      const dbQuizList = await fetchQuizList();
      dispatch(initState(dbBooks));
      dispatch(initMemoList(dbQuizList));
    };
```

これは状態管理が責務がコンポーネントに漏れ出ていてあまり望ましくないです。できれば状態の管理は全て Redux に任せたくなります。取得中はローディングを回してあげるなどができると良いかもしれませんね以下の文献が参考になります

[https://www.wantedly.com/companies/logical-studio/post_articles/430941](https://www.wantedly.com/companies/logical-studio/post_articles/430941)

### Back ボタンの設計

router ライブラリがあれば「一つ前のページ」とできそうですが今回は状態で管理しているので難しそうですね…！おすすめな設計としてはそのページとある文字列状態を１対１で結びつけてしまうことです。ちょうど`rootFlag`でやっているような形ですねまた、これはルーティングライブラリの再設計になってしまうのでそんなにおすすめじゃないのですが`rootFlagHistory`のような配列を持っておくのも良いかもしれません。遷移した際に次の`rootFlag`を追加していくような状態です。`['review', 'random', 'add', 'edit',….]`のように保持しておけば、back の際に一つ前のものを参照してセットするだけでその画面にたどり着けたり、なんてことができます。

### デザインを OOUI に寄せる（おまけ）

現在の UI がタスク思考になっていて、「本を追加するか」「メモを追加するか」で分かれています。現実世界だと本がそこにあって情報を追加したいとおもうはずです。なので本は一覧にしてあげてそこに「メモを追加する」「本を編集する」のボタンを追加すると良いかもしれません

[https://www.wantedly.com/companies/logical-studio/post_articles/430941](https://www.wantedly.com/companies/logical-studio/post_articles/430941)
