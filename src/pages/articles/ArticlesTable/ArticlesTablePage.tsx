import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllArticles } from "$/api/articles/get-all-articles";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import { PATHS } from "$/routes/constants";
import {
  ArticleRecord,
  ArticleRecordResponse,
  ArticlesTableFilters,
} from "$/types/api/article.types";

import ArticleTableHeaderWithFilterTrigger from "./_features/components/ArticleTableHeaderWithFilterTrigger";
import ArticlesTable from "./_features/components/ArticlesTable";

const ArticlesTablePage = () => {
  const navigate = useNavigate();

  const [articlesCounts, setArticlesCount] = useState<number | undefined>();

  return (
    <PageHeaderLayout
      headerText="Article"
      subtitle={articlesCounts ? `(${articlesCounts} Articles)` : undefined}
    >
      <EnhancedTableProvider<
        ArticleRecordResponse,
        ArticleRecord,
        ArticlesTableFilters
      >
        dataSelector={(data) => data.data}
        totalCountSelector={(data) => {
          setArticlesCount(data.count);
          return data.count;
        }}
        queryOptions={{
          queryKey: ["all-articles"],
          queryFn: ({ filters, pagination, sorting }) =>
            getAllArticles(sorting, pagination, filters),
          gcTime: 0,
        }}
      >
        <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
          <ArticleTableHeaderWithFilterTrigger
            handleAdd={() => navigate(PATHS.CREATE_ARTICLE)}
          />
          <ArticlesTable />
        </Flexbox>
      </EnhancedTableProvider>
    </PageHeaderLayout>
  );
};

export default ArticlesTablePage;
