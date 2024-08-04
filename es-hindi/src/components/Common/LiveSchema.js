export default function LiveSchema({ url, stamp, title = "", time }) {
  return (
    <>
      <time itemProp="datePublished" dateTime={time}></time>
      <time itemProp="url" content={`${url}#${stamp}`}></time>
      <span
        itemScope="itemScope"
        itemProp="author"
        itemType="http://schema.org/Person"
      >
        <meta content="https://Hindi.news18.com/" itemProp="sameAs" />
        <meta content="News18 हिंदी" itemProp="name" />
      </span>
      <span
        itemType="https://schema.org/ImageObject"
        itemScope="itemScope"
        itemProp="image"
      >
        <meta
          itemProp="url"
          content="https://images.news18.com/ibnkhabar/uploads/2020/03/Hindi1.png"
        />
        <meta content="138" itemProp="width" />
        <meta content="90" itemProp="height" />
      </span>
      <span
        itemType="https://schema.org/Organization"
        itemScope="itemScope"
        itemProp="publisher"
      >
        <span
          itemType="https://schema.org/ImageObject"
          itemScope="itemScope"
          itemProp="logo"
        >
          <meta
            content="https://images.news18.com/ibnkhabar/uploads/2020/03/Hindi1.png"
            itemProp="url"
          />
        </span>
        <meta content="News18 हिंदी" itemProp="name" />
      </span>
      <meta itemProp="mainEntityOfPage" content={url} />
      <meta itemProp="dateModified" content={time} />
      <meta itemProp="author" content="author" />
      <meta itemProp="headline" content={title && title != "" ? title.replace(/(<([^>]+)>)/gi, "").slice(0, 100) : "headline"} />
    </>
  );
}
