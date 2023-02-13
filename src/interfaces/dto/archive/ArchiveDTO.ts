export interface ArchiveDTO {
  id?: string
  userId?: string
  title?: string
  extension?: string
  blob?: Buffer
  checksum?: string
}

export interface ArchiveCreateRequest extends ArchiveDTO {
  userId: string
  title: string
  extension: string
  blob: Buffer
  checksum: string
}

export interface ArchiveCreateResponse extends ArchiveDTO {
  id: string
}
