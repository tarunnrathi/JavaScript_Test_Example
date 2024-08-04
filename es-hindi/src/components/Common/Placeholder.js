import { forwardRef } from "react";

const Placeholder = forwardRef((props, placeRef) => {
	return (
		<>
			<div ref={placeRef} className="placeholder" />
			<style jsx>{`
        @keyframes loadingAnimation {
          0% {
            background-color: #ddd;
          }
          50% {
            background-color: #ccc;
          }
          100% {
            background-color: #ddd;
          }
        }
        .placeholder {
          width: ${props.width ? `${props.width}px` : "100%"};
          height: ${props.height ? `${props.height}px` : "100%"};
          background-color: #ccc;
          position: absolute;
          ${props.ads
				? `bottom: 0;
          left: 50%;
          right: 0;
          transform: translateX(-50%);`
				: `
            top: 0;
            bottom: 0;
            right: 0;
            left:0;
            `}
          ${props.style ? props.style : 'position:absolute'}
        }
      `}</style>
		</>
	);
});

export default Placeholder;
