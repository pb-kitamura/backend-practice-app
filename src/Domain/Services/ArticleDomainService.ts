import { Article } from '../Models/Article/Entities/article'
import { IArticleRepository } from '../../Repository/Article/IArticleRepository'

export class ArticleDomainService {
  private articleRepository: IArticleRepository
  constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository
  }
  //重複を確認するメソッド（記事を作成するときに使う）
  public exists(article: Article) {
    const id = article.getId()
    console.log(id)
    //duplicatedArticle = this.articleRepository.find(id)
    //return  duplicatedArticle !== null 後で実装
  }
}
