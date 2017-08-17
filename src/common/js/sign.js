export default request.get(url)
    .then(res => {
        let { code, data } = res;
        if (code == 200) {
            return new OSS.Wrapper({
                region: 'oss-cn-qingdao',
                accessKeyId: data.cnt.AccessKeyId,
                accessKeySecret: data.cnt.AccessKeySecret,
                stsToken: data.cnt.SecurityToken,
                bucket: 'accessorygx'
            })
        }
    })
    .catch((e) => {
        console.log(e);
    })