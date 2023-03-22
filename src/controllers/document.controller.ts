export const fetchDocumentTypes = async () => {
	const token = document.cookie.split('; ').find((row: string) => row.startsWith('token='));
	if (!token) {
		return [];
	}

	const typesDocument = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/TypesDocument/getTypesDocuments`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.split('=')[1]}`
			},
			}).then(res => res.json()).then(res => {
				if(res.error) {
					return null;
				}
				console.log(res)
				return res.typesDocuments;
			})
	return typesDocument ? typesDocument : [];
}