export const ZIP_FORMAT_VERSIONS_MAPPING = {

    10: 'Default value',
    11: 'File is a volume label',
    20: 'File is a folder (directory), compressed using Deflate compression, encrypted using traditional PKWARE encryption',
    21: 'File is compressed using Deflate64(tm)',
    25: 'File is compressed using PKWARE DCL Implode',
    27: 'File is a patch data set',
    45: 'File uses ZIP64 format extensions',
    46: 'File is compressed using BZIP2 compression*',
    50: 'File is encrypted using DES, 3DES, original RC2 encryption, RC4 encryption',
    51: 'File is encrypted using AES encryption, corrected RC2 encryption**',
    52: 'File is encrypted using corrected RC2-64 encryption**',
    61: 'File is encrypted using non-OAEP key wrapping***',
    62: 'Central directory encryption',
    63: 'File is compressed using LZMA, PPMd+, Blowfish, Twofish'
}

export const COMPRESSION_METHOD_MAPPING = {

    0: 'The file is stored (no compression)',
    1: 'The file is Shrunk',
    2: 'The file is Reduced with compression factor 1',
    3: 'The file is Reduced with compression factor 2',
    4: 'The file is Reduced with compression factor 3',
    5: 'The file is Reduced with compression factor 4',
    6: 'The file is Imploded',
    7: 'Reserved for Tokenizing compression algorithm',
    8: 'The file is Deflated',
    9: 'Enhanced Deflating using Deflate64(tm)',
   10: 'PKWARE Data Compression Library Imploding (old IBM TERSE)',
   11: 'Reserved by PKWARE',
   12: 'File is compressed using BZIP2 algorithm',
   13: 'Reserved by PKWARE',
   14: 'LZMA',
   15: 'Reserved by PKWARE',
   16: 'IBM z/OS CMPSC Compression',
   17: 'Reserved by PKWARE',
   18: 'File is compressed using IBM TERSE (new)',
   19: 'IBM LZ77 z Architecture (PFS)',
   96: 'JPEG variant',
   97: 'WavPack compressed data',
   98: 'PPMd version I, Rev 1',
   99: 'AE-x encryption marker (see APPENDIX E)'
}

/*
export const ZIP_FORMAT_VERSIONS = {

    '1.0': ['Default value'],
    '1.1': ['File is a volume label'],
    '2.0': ['File is a folder (directory)', 'File is compressed using Deflate compression', 'File is encrypted using traditional PKWARE encryption'],
    '2.1': ['File is compressed using Deflate64(tm)'],
    '2.5': ['File is compressed using PKWARE DCL Implode'],
    '2.7': ['File is a patch data set'],
    '4.5': ['File uses ZIP64 format extensions'],
    '4.6': ['File is compressed using BZIP2 compression*'],
    '5.0': ['File is encrypted using DES', 'File is encrypted using 3DES', 'File is encrypted using original RC2 encryption', 'File is encrypted using RC4 encryption'],
    '5.1': ['File is encrypted using AES encryption', 'File is encrypted using corrected RC2 encryption**'],
    '5.2': ['File is encrypted using corrected RC2-64 encryption**'],
    '6.1': ['File is encrypted using non-OAEP key wrapping***'],
    '6.2': ['Central directory encryption'],
    '6.3': ['File is compressed using LZMA', 'File is compressed using PPMd+', 'File is encrypted using Blowfish', 'File is encrypted using Twofish']
}
*/
