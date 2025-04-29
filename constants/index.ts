const ACCESS_TOKEN = 'ac';
const REFRESH_TOKEN = 'rf';
const LANGUAGE = 'i18n_redirected';
const USER = 'user';
const DAY_FORMAT = 'DD-MM-YYYY';

const MAX_SIZE_FILE = 200 * 1024 * 1024;
const SUPPORT_FORMATS_FILE = [
  'DGN',
  'DWF',
  'DWG',
  'DXF',
  'IFC',
  'IFCZIP',
  'OBJ',
  'RCS',
  'RFA',
  'RVT',
  'STEP',
  'STL',
  'STP',
  'VSFX',
  '3DS',
  '3DM',
  'AMF',
  'GLTF',
  'PLY',
  'BIM',
  'DAE',
  'FBX',
];

const MAX_SIZE_IMG_PROJECT = 5 * 1024 * 1024;
const SUPPORT_FORMATS_IMG_PROJECT = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/tiff',
  'image/bmp',
  'image/ico',
  'image/svg+xml',
  'image/webp',
];

const MAX_SIZE_FILE_FEEDBACK = 10 * 1024 * 1024;
const SUPPORT_FORMATS_FILE_FEEDBACK = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-zip-compressed',
];

const SUPPORT_FORMATS_3DVIEWER = [
  'dgn',
  'dwf',
  'dwg',
  'dxf',
  'ifc',
  'ifczip',
  'nwc',
  'nwd',
  'obj',
  'rcs',
  'rvt',
  'step',
  'stl',
  'stp',
  'vsfx',
  '3ds',
  '3dm',
  'amf',
  'gltf',
  'ply',
  'bim',
  'dae',
  'fbx',
  'off',
  'igs',
  'glb'
];
const SUPPORT_FORMATS_VIEWER3D = ['3ds', '3dm', 'amf' , 'gltf' , 'ply' , 'bim' , 'dae' ,'fbx' ,'off','igs','glb' ];

const SUPPORT_FORMATS_CONVERTER = ['dwg', 'dxf', 'rvt', 'rfa', 'dgn', 'stl', 'obj'];
// Error code
enum ERROR_CODE {
  Unauthorized = 401,
  UNPROCESSABLE_ENTITY = 422,
  BAD_REQUEST = 400,
}

enum USER_ROLE {
  Admin = 'system_admin',
  User = 'system_user',
}

enum ConvertStatus {
  FAILED = 0,
  START = 1,
  SUCCESS = 2,
  SAVE = 3,
}

enum StatusFileViewer {
  DONE = 'done',
  FAILED = 'failed',
}

export {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  LANGUAGE,
  ERROR_CODE,
  USER,
  USER_ROLE,
  DAY_FORMAT,
  MAX_SIZE_FILE,
  SUPPORT_FORMATS_FILE,
  MAX_SIZE_IMG_PROJECT,
  SUPPORT_FORMATS_IMG_PROJECT,
  MAX_SIZE_FILE_FEEDBACK,
  SUPPORT_FORMATS_FILE_FEEDBACK,
  ConvertStatus,
  StatusFileViewer,
  SUPPORT_FORMATS_3DVIEWER,
  SUPPORT_FORMATS_VIEWER3D,
  SUPPORT_FORMATS_CONVERTER,
};
