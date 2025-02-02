// Document types
import media from './documents/media'
import person from './documents/person'
import marriage from './documents/marriage'

const documents = [person, marriage, media]

// Block types
import bio from './blocks/bio'

const blocks = [bio]

export const schemaTypes = [...documents, ...blocks]
