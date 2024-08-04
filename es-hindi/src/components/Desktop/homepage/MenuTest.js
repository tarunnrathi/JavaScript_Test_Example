import React, { memo, useEffect } from "react";

const MenuTest = (props) => {
  const menu = props.data.getMenuTest;
  const menuList = menu.menu;

  return (
    <>
      <div className="container clearfix">
             {
              menuList && menuList.map((item, index) => {
                return (
                  <li>{item.label}</li>
                );
              })
             }
      </div>
      <style jsx global>{`
       
      `}</style>
    </>
  );
};

export default memo(MenuTest);
