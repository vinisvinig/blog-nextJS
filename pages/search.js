import Base from "@layouts/Baseof";
import Posts from "@layouts/partials/Posts";
import { getSinglePages } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";

const SearchPage = ({ authors }) => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key);
  const { posts } = useSearchContext();

  const searchResults = posts.filter((product) => {
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (
      product.frontmatter.tags.find((tag) => slugify(tag).includes(keyword))
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  return (
    <Base title={`Search results for ${query.key}`}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Exibindo resultados de <span className="text-primary">{query.key}</span>
          </h1>
          {searchResults.length > 0 ? (
            <Posts posts={searchResults} authors={authors} />
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              Nenhuma busca encontrada :( 
            </div>//Atenção - Possível bug na carinha triste parêntese aberto mas não fechado"("
          )}
        </div>
      </div>
    </Base>
  );
};

export default SearchPage;

// get authors data
export const getStaticProps = () => {
  const authors = getSinglePages("content/authors");
  return {
    props: {
      authors: authors,
    },
  };
};
