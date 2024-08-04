import React from 'react';

const Breadcrumb = ({ title = '', category = '', breadcrumb = "", categoryUrl = "" }) => {
  return (
    <div>
        <div className="breadcrumbs">
          {category ?(
            <ul className='breadcum scrollbar'>
                    <li>
                      <a href='/'>होम</a>{" "}
                    </li>{" "}
                    »{" "}
                    <li>
                      <a href={`/news/`}>न्यूज</a>
                    </li>{" "}
                    »
                    <li>
                      <a href={`/news/${categoryUrl ? categoryUrl : category}/`}> {category} </a>
                    </li>
                    »<h2>{breadcrumb ? breadcrumb: title}</h2>
                  </ul>

          ):(
             <ul className='breadcum scrollbar'>
             <li>
               <a href="/">Home</a>
             </li>{" "}
             »
             <li>
             <a href="/news/">News</a>
             </li>
             »
             <h2>
               {breadcrumb ? breadcrumb: title}
             </h2>
           </ul>
          ) }

          </div>
    </div>
  );
};

export default Breadcrumb;
