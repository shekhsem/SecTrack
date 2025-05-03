export function formatAsset(asset) {
    return {
      _id: asset._id.toString(),
      name: asset.name,
      ip: asset.ip,
      hostname: asset.hostname,
      software: asset.software,
      version: asset.version,
      online: asset.online,
      vulnerabilities: asset.vulnerabilities,
      status: asset.statusId
        ? {
            _id: asset.statusId._id.toString(),
            name: asset.statusId.name
          }
        : null
    };
  }