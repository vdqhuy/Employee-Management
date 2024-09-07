export const convertDataResponseToTimeLineElement = (data) => {
    const convertResult = data.map((e) => convertSingleElement(e));
    return convertResult
}

export const convertSingleElement = (element) => {
    let track = {
        id: element.MaNV,
        isOpen: false,
        title: element.TenNV,
        tracks: []
    };
    const elements = [];
    element.dangkylichlam.forEach((e) => {
        const obj = {
            id: e.MaLichLam,
            title: '',
            start: new Date(new Date(e.NgayDangKy).setHours(0, 0, 0, 0)),
            end: new Date(new Date(e.NgayDangKy).setHours(23, 59, 59, 999)),
            rawData: e,
            style: {
                backgroundColor: colorStatus(e.TrangThai),
                borderRadius: "4px",
                boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.25)",
                color: "#000000",
                textTransform: "capitalize",
                margin: "0px 2px",
            }
        }
        elements.push(obj);
    });
    track.elements = elements;
    return track;
}

export const colorStatus = (status) => {
    // eslint-disable-next-line default-case
    switch(status) {
        case 'PENDING': 
            return '#ffc107'
        case 'REJECT': 
            return '#DB3d44'       
        case 'APPROVE':
            return '#198754'
        default:
            return '#A1C181'
    }
}