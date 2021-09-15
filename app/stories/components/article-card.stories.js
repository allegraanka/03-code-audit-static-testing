/**
 * @file A card summarizing a blog article.
 */

import ArticleCard from '~/components/ArticleCard'

import { createTemplate, decorators, articles } from '~/helpers/storybook'

export default {
  title: 'Components/Article Card',
  component: ArticleCard,
  decorators: [decorators.card]
}

/**
 * The basic Article Card.
 */
export const Base = createTemplate(ArticleCard, articles.default)
