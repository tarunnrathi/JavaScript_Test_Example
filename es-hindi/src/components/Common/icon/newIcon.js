const NewIcon = ({ styleStr }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="9" viewBox="0 0 23 12">
                <g id="Group_553" data-name="Group 553" transform="translate(-731 -212)">
                    <rect id="Rectangle_1" data-name="Rectangle 1" width="23" height="12" rx="2" transform="translate(731 212)" fill="#db3832" />
                    <path id="Path_1" data-name="Path 1" d="M5.391,0H3.51L1.71-4.833q.09.711.14,1.256T1.9-2.286V0H.585V-6.237H2.421L4.266-1.395a14.68,14.68,0,0,1-.2-2.322v-2.52H5.391Zm4.833-5.184h-2.2V-3.69H9.945v1.035H8.028v1.593h2.349V0H6.552V-6.237h3.825ZM17.19,0H15.273L14.5-4.761,13.68,0H11.808L10.782-6.237h1.476l.621,5.121.864-5.121h1.548l.81,5.121.729-5.121h1.4Z" transform="translate(733.415 221.237)" fill="#fff" />
                </g>
            </svg>
            <style jsx global>{`${styleStr ? styleStr : ''}`}</style>
        </>
    );
};

export default NewIcon;
