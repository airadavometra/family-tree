import {defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineField({
  name: 'media',
  title: 'Изображения',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Краткое описание',
      type: 'string',
      description: 'Необходимо для слабовидящих и незрячих людей.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title ?? 'Новое изображение',
        media: media ?? ImageIcon,
      }
    },
  },
})
