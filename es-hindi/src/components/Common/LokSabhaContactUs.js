import React from "react";
const LokSabhaContactUs  =(props) =>{
    const { isMobile } = props.data;
    return(
        <div style={{width:isMobile ? "auto" : "640px", margin:"0px auto"}} className="frmimg">
            <h1 className="el_hd">News18 Network - The No. 1 coverage of General Elections 2024 on the No.1 News Network of the Country</h1>
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdyMCVjtfu0hmhZWH3itKdzXpqo67KC09iB-2za1UCh4tkjfQ/viewform?embedded=true" 
                width={isMobile ? "370" : "640"} 
                height={isMobile? "1450" : "1350"} frameBorder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            <style jsx global>{`
            // .frmimg figure, .frmimg figure span, .frmimg figure img {
            //     width: 100% !important;
            //     height:auto !important;
            // }
            // .frmimg figure{margin-bottom:10px;}
            .el_hd{
                text-align: center;
                font-size: 28px;
                line-height: 34px;
                color:#111; 
                padding:10px;
                
            }
            @media screen and (max-width:450px){
                .el_hd{                    
                    font-size: 22px;
                    line-height: 28px;                   
                    
                }  
            }
            `}</style>
        </div>
    )
}
export default LokSabhaContactUs;