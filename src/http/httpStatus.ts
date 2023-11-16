export const HTTP_STATUS_CODE = {
  OK: 200,
  BadRequest: 400,
  NotFound: 404,
  QueryParametersError: 400,
  QueryBodyError: 400,
  DataBaseError: 505,
  InternalServerError: 505,
}

export const HTTP_ERROR_MESSAGE = {
  BadRequest: 'Client Error',
  NotFound: 'コンテンツが見つかりません',
  QueryParametersError: 'クエリパラメータに問題があります',
  QueryBodyError: 'titleは必須です',
  DataBaseConnectionError: 'データベースとの接続に失敗しました。',
  DataBaseQueryError: 'データベースのクエリ実行が失敗しました。',
  InternalServerError: 'エラーが発生しました。',
}
