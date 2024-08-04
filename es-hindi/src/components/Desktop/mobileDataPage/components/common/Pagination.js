import React from 'react';
import { get_pagination } from 'includes/paginationHelper';

const Pagination = (props) => {
  const curpage = props.curpage ? props.curpage : 1;
  const totalRecords = props.TotalRecord <= 2000 ? props.TotalRecord : 2000;
  const _pagiParam = get_pagination(
    curpage,
    props.limit,
    totalRecords,
    props.pageurl,
    props.pageflag
  );
  return (
    <>
      <ul className='pagination'>
        {_pagiParam.firstPage ? (
          <li className='prev'>
            <a onClick={() => props?.paginationClick(parseInt(curpage) - 1)} rel='prev'>
              <svg width="8.64px" height="14px" viewBox="0 0 11 20" version="1.1"><g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Rounded" transform="translate(-345.000000, -3434.000000)"><g id="Navigation" transform="translate(100.000000, 3378.000000)"><g id="-Round-/-Navigation-/-arrow_forward_ios" transform="translate(238.000000, 54.000000)"><g><polygon id="Path" opacity="0.87" points="24 24 0 24 0 0 24 0"></polygon><path d="M7.38,21.01 C7.87,21.5 8.66,21.5 9.15,21.01 L17.46,12.7 C17.85,12.31 17.85,11.68 17.46,11.29 L9.15,2.98 C8.66,2.49 7.87,2.49 7.38,2.98 C6.89,3.47 6.89,4.26 7.38,4.75 L14.62,12 L7.37,19.25 C6.89,19.73 6.89,20.53 7.38,21.01 Z" id="🔹-Icon-Color" fill="#1D1D1D"></path></g></g></g></g></g></svg>
            </a>
          </li>
        ) : (
          ''
        )}
        {_pagiParam.allPages.allPages
          ? _pagiParam.allPages.allPages.map((e, key) => (
            <li key={'pagi' + key}>
              <a
                onClick={() => props?.paginationClick(e.pageNumber)}
                className={e.selected ? e.selected : ''}
              // href={e.url ? e.url : '/'}
              >
                {e.pageNumber}
              </a>
            </li>
          ))
          : ''}
        {_pagiParam.nextPage ? (
          <li className='next'>
            <a onClick={() => props?.paginationClick(parseInt(curpage) + 1)}>
              <svg width='8.64px' height='14px' viewBox='0 0 11 20' version='1.1'>
                <g
                  id='Icons'
                  stroke='none'
                  strokeWidth='1'
                  fill='none'
                  fillRule='evenodd'
                >
                  <g
                    id='Rounded'
                    transform='translate(-345.000000, -3434.000000)'
                  >
                    <g
                      id='Navigation'
                      transform='translate(100.000000, 3378.000000)'
                    >
                      <g
                        id='-Round-/-Navigation-/-arrow_forward_ios'
                        transform='translate(238.000000, 54.000000)'
                      >
                        <g>
                          <polygon
                            id='Path'
                            opacity='0.87'
                            points='24 24 0 24 0 0 24 0'
                          ></polygon>
                          <path
                            d='M7.38,21.01 C7.87,21.5 8.66,21.5 9.15,21.01 L17.46,12.7 C17.85,12.31 17.85,11.68 17.46,11.29 L9.15,2.98 C8.66,2.49 7.87,2.49 7.38,2.98 C6.89,3.47 6.89,4.26 7.38,4.75 L14.62,12 L7.37,19.25 C6.89,19.73 6.89,20.53 7.38,21.01 Z'
                            id='🔹-Icon-Color'
                            fill='#1D1D1D'
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </li>
        ) : (
          ''
        )}
      </ul>
      <style jsx>{`
        ul.pagination {
          padding: 10px 0 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        ul.pagination li a {
          font: bold 16px/24px Mukta, sans-serif;
          text-decoration: none;
          display: flex;
          width: 33px;
          height: 33px;
          align-items: center;
          justify-content: center;
          color: #000;
          line-height: 33px;
          background: #e8e8e8;
          border-radius: 100px;
        }
        ul.pagination li {
          margin: 0 4px;
          position: relative;
        }
        li.next {
          position: relative;
        }
        /*li.next:after {     content: "";     position: absolute;     width: 11px;     height: 11px;     border-bottom: 2px solid #393939;     border-right: 2px solid #393939;     transform: rotate(-45deg);     display: block;     left: 8px;     top: 9px; }*/
        // li.next svg,li.prev svg  {
        //   margin-top: 7px;
        // }
        ul.pagination li a:hover {
          background: #ed1c24;
          color: #fff;
        }
        // li.prev:after {
        //   content: '';
        //   position: absolute;
        //   width: 11px;
        //   height: 11px;
        //   border-top: 2px solid #393939;
        //   border-left: 2px solid #393939;
        //   transform: rotate(-45deg);
        //   display: block;
        //   left: 12px;
        //   top: 10px;
        // }
        .pagination li a.selected {
          background: #ed1c24;
          color: #fff;
        }

        li.prev svg{
          transform: rotate(180deg);
        }
        .pagination li:hover{
           cursor:pointer; 
        }
      `}</style>
    </>
  );
};
export default Pagination;
