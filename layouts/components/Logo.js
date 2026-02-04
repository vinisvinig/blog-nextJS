import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { base_url, logo, title } = config.site;

  return (
    <Link href={base_url} passHref>
      <a className="navbar-brand block" style={{ width: "34px", height: "34px" }}>
        {logo ? (
          <Image
            width={34}
            height={34}
            src={logo}
            alt={title}
            priority
            layout="fixed"
          />
        ) : (
          title
        )}
      </a>
    </Link>
  );
};

export default Logo;
