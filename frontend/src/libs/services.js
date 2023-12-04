import request from '../libs/request';

const sys = request('luna://com.webos.service.tv.systemproperty');
export const getSystemInfo = params =>
	sys({method: 'getSystemInfo', ...params});

const sam = request('luna://com.webos.applicationManager');
export const launch = parameters => sam({method: 'launch', parameters});

// get system status
const mem_ = request('luna://com.webos.memorymanager');
export const getCpuInfo = params => 
	mem_({method: 'getProcStat', ...params});

const cpu_ = request('luna://com.webos.memorymanager');
export const getMemoryInfo = params => 
	cpu_({method: 'getUnitList', ...params});