export default function validator(body) {
	body = body
		.replace(/(<amp-iframe .*?")(http:)/gi, '$1https:') // invalid protocol [iframe]
		.replace(/(<amp-iframe .*?width=")(.*?)"/gi, '$1300"') // Invalid width [iframe]
		.replace(/(<amp-iframe .*?height=")(.*?)"/gi, '$1360"') // Invalid width [iframe]
		.replace(/(<amp-iframe .*?frameborder=")([^0])/gi, '$10') // Invalid frameborder [iframe]
		.replace(/(<amp-iframe .*?)(name=".*?")/gi, "$1"); // Invalid name [iframe]
	return body;
}
