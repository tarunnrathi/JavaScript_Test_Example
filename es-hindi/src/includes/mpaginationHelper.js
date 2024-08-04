// import your default seo configuration
module.exports = {
  get_pagination: (cur_page, per_page, totalrecords, query_string, flag = false) => {
      let curpage = (cur_page)?cur_page:1;
      curpage = parseInt(curpage);
      const range = per_page;
      const offser = (cur_page - 1) * per_page;
      // below line remove first slash, so comment this
      if(query_string && query_string[0] === "/") {
          query_string = query_string.replace(/\/+/, '');
      }
      // console.log("query_string", query_string)
      const totalpages = Math.ceil(totalrecords / per_page);
      let obj = '';
      let firstPage = '';
      let nxtPage = '';
      if(totalpages > 1)
      {
          const prevpage = curpage - 1;
          let st = '';
          let end = '';
          let rel = '';
          //pagination+= '<ul className="pagination">';
          if(curpage > 4)
          {
              st = curpage - 2;
              end = curpage + 2;
              if(end >= totalpages)
              {
                  end = totalpages;
              }
              else
              {
                  end = end;
              }
          }
          else
          {
              st = 1;
              if(totalpages < 5)
              {
                  end = totalpages;
              }
              else
              {
                  end = 5;
              }
              const t = range;
          }
          if(curpage >1) {
              if(cur_page == 2 && flag) {
                  firstPage = '/'+query_string.replace(/\/+$/, '') +'.html';
              }else if(cur_page == 2 && !flag) {
                  if (query_string.replace(/\/+$/, '').includes('html')) {
                      firstPage = '/' + query_string.replace(/\/+$/, '');
                  } else {
                      firstPage = '/' + query_string.replace(/\/+$/, '') + '/';
                  }
              } else {
                  firstPage = '/'+query_string+'page-'+prevpage+'/';
              }
          }
          const result = {};
          result["allPages"] = [];
          let pageObj = '';
          for(let j=st; j<=end; j++)
          {
              const p =j-1;
              if(j > curpage) {
                  rel="next";
              } else{
                  rel="prev";
              }

              if(j==1 && flag) {
                  const q = '/'+query_string.replace(/\/+$/, '') +'.html';
                  pageObj = { pageNumber: j, selected: '', url: q, rel: rel };
              }else if(j==1 && !flag) {
                  let q = '/'+query_string.replace(/\/+$/, '')+'/';
                  if (query_string.replace(/\/+$/, '').includes('html')) {
                      q = '/' + query_string.replace(/\/+$/, '');
                  }
                  pageObj = { pageNumber: j, selected: '', url: q, rel: rel };
              }else{
                  const q = '/'+query_string+"page-"+j+'/';
                  pageObj = { pageNumber: j, selected: '', url: q, rel: rel };
              }

              if(curpage == j) {
                  pageObj = { ...pageObj, selected: 'selected', rel: 'prev' };
              }

              if(pageObj) {
                  result["allPages"].push(pageObj);
              }
          }
          const nextpos = offser + range;
          const nextpage = (curpage + 1);
          if(curpage < totalpages) {
              nxtPage = '/'+query_string+'page-'+nextpage+'/';
          }
          obj = { start: st, end: end, firstPage: firstPage, nextPage: nxtPage, allPages: result };

      }else{
          const result = {};
          result["allPages"] = [];
          obj = { start: '', end: '', firstPage: '', nextPage: '', allPages: result };
      }
      return obj;
  },
};
