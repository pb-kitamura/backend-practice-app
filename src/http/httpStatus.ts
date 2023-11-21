export const HTTP_STATUS_CODE = {
  OK: 200,
  BadRequest: 400,
  NotFound: 500,
  QueryParametersError: 400,
  QueryBodyError: 400,
  DuplicateIdError: 500,
  DataBaseError: 505,
  InternalServerError: 505,
}

export const HTTP_ERROR_MESSAGE = {
  BadRequest: 'Client Error',
  NotFound: 'コンテンツが見つかりません',
  QueryParametersError: 'クエリパラメータに問題があります',
  QueryBodyError: 'titleは必須です',
  DuplicateIdError: '生成されたidはすでに使われています',
  DataBaseConnectionError: 'データベースとの接続に失敗しました。',
  DataBaseQueryError: 'データベースのクエリ実行が失敗しました。',
  InternalServerError: 'エラーが発生しました。',
}
