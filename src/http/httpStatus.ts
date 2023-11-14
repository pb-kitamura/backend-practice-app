export const HTTP_STATUS_CODE = {
  OK: 200,
  BadRequest: 400,
  NotFound: 404,
  QueryParametersError: 405,
  DataBaseError: 505,
  InternalServerError: 505,
}

export const HTTP_ERROR_MESSAGE = {
  BadRequest: 'Client Error',
  NotFound: 'コンテンツが見つかりません',
  QueryParametersError: 'クエリパラメータに問題があります',
  DataBaseConnectionError: 'データベースとの接続に失敗しました。',
  DataBaseQueryError: 'データベースのクエリ実行が失敗しました。',
  InternalServerError: 'エラーが発生しました。',
}
