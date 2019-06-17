export const VERSION = {

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

export const COMPRESSION_METHOD = {

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

export const PLATFORM = {

    0:  'MS-DOS and OS/2 (FAT / VFAT / FAT32 file systems)',
    1:  'Amiga',
    2:  'OpenVMS',
    3:  'UNIX',
    4:  'VM/CMS',
    5:  'Atari ST',
    6:  'OS/2 H.P.F.S.',
    7:  'Macintosh',
    8:  'Z-System',
    9:  'CP/M',
    10: 'Windows NTFS',
    11: 'MVS (OS/390 - Z/OS)',
    12: 'VSE',
    13: 'Acorn Risc',
    14: 'VFAT',
    15: 'alternate MVS',
    16: 'BeOS',
    17: 'Tandem',
    18: 'OS/400',
    19: 'OS X (Darwin)'
}

export const MSDOS = 0
export const UNIX = 3

export const GENERAL_BIT_FLAG = {

    1:     'Bit 0 - File is encrypted',
    8:     'Bit 3 - Bit Fields CRC-32, compressed size, uncompressed size are set to zero in the local header.',
    16:    'Bit 4 - Reserved for use with deflate method, for enhanced deflating',
    32:    'Bit 5 - File is compressed patched data',
    64:    'Bit 6 - Strong encryption',
    128:   'Bit 7 - Currently unused',
    256:   'Bit 8 - Currently unused',
    512:   'Bit 9 - Currently unused',
    1024:  'Bit 10 - Currently unused',
    2048:  'Bit 11 - Currently unused',
    4096:  'Bit 12 - Reserved by PKWARE for enhanced compression.',
    8192:  'Bit 13 - Selected data values in the Local Header are masked to hide their actual values',
    16384: 'Bit 14 - Reserved by PKWARE',
    32768: 'Bit 15 - Reserved by PKWARE'
}

export const IMPLODING_BIT_FLAG = {

    0: 'Imploded (0x00): 4K sliding dictionary, 2 Shannon-Fano trees',
    2: 'Imploded (0x02): 4K sliding dictionary, 3 Shannon-Fano trees',
    4: 'Imploded (0x04): 8K sliding dictionary, 2 Shannon-Fano trees',
    6: 'Imploded (0x06): 8K sliding dictionary, 3 Shannon-Fano trees'
}

export const DEFLATE_BIT_FLAG = {

    0: 'Deflate + (0x00): Normal (-en) compression',
    2: 'Deflate + (0x02): Maximum (-exx/-ex) compression',
    4: 'Deflate + (0x04): Fast (-ef) compression',
    6: 'Deflate + (0x06): Super Fast (-es) compression'
}

export const IMPLODED = 6
export const DEFLATE = 8
export const DEFLATE64 = 9

export const INTERNAL_ATTRIBUTES = {

    0: '(0x0000): The file apparently contains binary data',
    1: '(0x0001): File is an ASCII or text file',
    2: '(0x0002): A 4 byte variable record length control field precedes each logical record (mainframe data transfer support)',
    4: '(0x0004): Reserved for use by PKWARE',
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

export const END_SIG = 0x06054B50
export const END_SPO = 0
export const END_DNU = 4  // disk number
export const END_DCS = 6
export const END_CND = 8
export const END_CDC = 12
export const END_CDS = 12
export const END_OFF = 16
export const END_ZCL = 20
export const END_HDR = 22
export const END_MAX = END_HDR + 0xFFFF

export const ELO_SIG = 0x07064B50
export const ELO_SPO = 0
export const ELO_DCS = 4
export const ELO_OFF = 8
export const ELO_TDN = 16
export const ELO_HDR = 20

export const E64_SIG = 0x06064B50
export const E64_SPO = 0  // signature
export const E64_SIZ = 4  // size of end of zip64 directory record
export const E64_VEM = 12 // version made by
export const E64_PLM = 13 // platform made by
export const E64_VER = 14 // version needed
export const E64_PLT = 15 // platform needed
export const E64_DSK = 16 // disk number
export const E64_DCD = 20 // disk number with start of central directories
export const E64_CDD = 24 // central directories number on disk
export const E64_CDN = 32 // central directories number
export const E64_CDS = 40 // central directories size
export const E64_OFF = 48 // central directories offset to starting disk
export const E64_HDR = 56

export const CEN_SIG = 0x02014B50
export const CEN_SPO = 0
export const CEN_VEM = 4
export const CEN_PLM = 5
export const CEN_VER = 6
export const CEN_PLT = 7
export const CEN_FLG = 8
export const CEN_MTD = 10
export const CEN_TIM = 12
export const CEN_DAT = 14
export const CEN_CRC = 16
export const CEN_SIC = 20
export const CEN_SIU = 24
export const CEN_FLE = 28
export const CEN_ELE = 30
export const CEN_CLE = 32
export const CEN_DSK = 34
export const CEN_ATT = 36
export const CEN_ATX = 38
export const CEN_OFF = 42
export const CEN_HDR = 46
export const CEN_MAX = CEN_HDR + 0xFFFF + 0xFFFF + 0xFFFF

export const LOC_SIG = 0x04034B50
export const LOC_SPO = 0
export const LOC_VER = 4
export const LOC_PLT = 5
export const LOC_FLG = 6
export const LOC_MTD = 8
export const LOC_TIM = 10
export const LOC_DAT = 12
export const LOC_CRC = 14
export const LOC_SIC = 18
export const LOC_SIU = 22
export const LOC_FLE = 26
export const LOC_ELE = 28
export const LOC_HDR = 30
export const LOC_MAX = LOC_HDR + 0xFFFF + 0xFFFF
