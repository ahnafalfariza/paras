export const getImageUrl = (data) => {
  if (data && data.type === 'ipfs') {
    return `https://ipfs-gateway.paras.id/ipfs/${data.url}`;
  }
  return data;
};
