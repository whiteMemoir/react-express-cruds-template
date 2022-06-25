import React from "react";

const Upload = ({ img, ...rest }) => {
	return (
		<div>
			{img && <img src={img} width="200" />}
			<input {...rest} />
		</div>
	);
};

export default Upload;
