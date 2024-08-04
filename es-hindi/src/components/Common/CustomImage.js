import { setDefaultImage } from "includes/article.util";
import Image from "next/image";
import React from "react";

const placeholderBase64 =
  "data:image/jpeg;base64,UklGRgIDAABXRUJQVlA4IPYCAAAwJQCdASosAcgAPmEwlkekIyIhJDcIkIAMCWlu4XVRG2jfiezIohx5359wXuC9wXuC9wXuC9wXuC9wXuC9wXuC9wXuC9wXuC9wXuCq2ceFaLiV1H/8x9KwXf/OJLzd1lEVyRpIJzRpHhHXSnGBod9IfYFu9Ruvr0h55Rv1jwdfEvYf5d4GaFyCsqZGWdaid2H9uJlL8XfDpo4g+wC3ExOPLYgOdJ4t1Mblm4ysYoXF3UiI/9o2hGBY87tiBEHfdTovs/BCUUX7JmRRDV8ns9emZLbbgGLReXrq58pYe3e+cWwEE6VkgKz9XtXMNjKSc5T3w+yapJRHVhcUQ47hE3tkyf2QSiF+YwKTtepaied+fcF7gvcF7gvcF7gvcF7gvcF7gvcF7gvcF7gvcF7gvcF7fgAA/v9y6AAAtG7FCnlC644LTxONH+0DNmaexB4oaAsZzGu/EonTQ3s6CyPU09LPMFvfmIHni8v9IjHEBaNnLXPrqmWQ5bnizZgGM6Dqz0t2UEqzewqsz5Yq8Xksvl8hLAAcYVn/kYLMj0KB/KSMB3q6y8CZTcEz4OrUgbMbd8Zb1kQlSEVdGHtMMFj69samn9sIUV8x7MXPx5K4u/jZ603Gm8N6Qwhe4FxNhjInXZO8aRl7T3dnNp6b8nkjX3MoF/PqV+wnu14N6gCHHg58HAlI8rwKTacUs0dxcaYP5oVoCMa+Wg13ibQGDE9IW16Mp9V+3SBCD1p5zrCGXcG3CYpUJi0WPhKZFr2sF8HRNjNsEnJduIFUAhoQdZxL5hQe5AS0QaTvrxdQ5z1hw1kwJ5B2nQkPod8XD6Y3E4eJMn8tr0BCibcIusPCYW/4+G/Yeuobu/pr82bvxdoSZau6Ow6+Xjyq2pr2q953XKusKZQ30SJx5oE8NuUARh6i4MjKzHe9TFXjvwJhq5g0AWjhEsVVBk+JQLUDtYLpKb9AbKWeNzZhAZLYjWS474VUOSu6MqC5ItYIQIvL+wGTcSajbQAAAAAAAA==";

const LazyLoadImage = ({
  id="",
  src,
  width,
  height,
  alt = "no alt provided",
  onError = setDefaultImage,
  isAMP = false,
  title = "No title",
  layout = "responsive",
  defaultImageURL = "",
  isLazyLoad = true,
  loading = "lazy",
  isRes = false,
  isPolicy = true,
  isPlaceHolderRequired=true,
  isByline=false,
  ...rest
}) => {
  if (isAMP) {
    return (
      <>
        <amp-img
          {...rest}
          src={
            src
              ? src +
                (isPolicy
                  ? isByline ? `?im=Resize,width=${width},aspect=fit,type=normal`: `?impolicy=website&width=${width}&height=${height}`
                  : "")
              : placeholderBase64
          }
          width={width}
          {...(height ? { height: height } : {})}
          layout={layout}
          alt={alt}
          title={title}
        >
          {isLazyLoad && (
            <amp-img
              {...rest}
              alt={alt}
              fallback=""
              width={width}
              {...(height ? { height: height } : {})}
              src={defaultImageURL || "/images/placeholder.jpg"}
            ></amp-img>
          )}
        </amp-img>
      </>
    );
  } else {
    return (
      <Image
        {...rest}
        {...(isLazyLoad ? { loading: loading } : { priority: !isLazyLoad })}
        {...(height ? { height: height } : {})}
        {...(isPlaceHolderRequired ? { placeholder: placeholderBase64 } : {})}
        src={
          src
            ? `${src}${
                isPolicy
                  ? `?impolicy=website&width=${width}${
                      height ? `&height=${height}` : ""
                    }`
                  : ""
              }`
            : placeholderBase64
        }
        width={width}
        alt={alt}
        onError={(data, wd, ht) => onError(data, wd, ht, defaultImageURL)}
        unoptimized={true}
        id={id}
      />
    );
  }
};

export default LazyLoadImage;
