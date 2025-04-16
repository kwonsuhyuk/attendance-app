import { Helmet } from "react-helmet";
// react-async-helmet으로 교체 예정
interface SeoProps {
  title: string;
  description?: string;
}

const Seo = ({ title, description }: SeoProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default Seo;
