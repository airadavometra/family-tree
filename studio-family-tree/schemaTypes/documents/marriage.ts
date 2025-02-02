import {defineField} from 'sanity'
import {ConfettiIcon} from '@sanity/icons'
import {MONTH_NAMES} from '../../constants/monthNames'

export default defineField({
  name: 'marriage',
  title: 'Браки',
  type: 'document',
  icon: ConfettiIcon,
  fieldsets: [{name: 'weddingDate', title: 'Дата свадьбы'}],
  fields: [
    defineField({
      name: 'spouse1Ref',
      title: 'Супруг',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'man'},
      },
    }),
    defineField({
      name: 'spouse2Ref',
      title: 'Супруга',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'woman'},
      },
    }),

    defineField({
      name: 'yearOfWedding',
      title: 'Год свадьбы',
      type: 'number',
      fieldset: 'weddingDate',
      validation: (rule) => rule.min(1).max(3000),
    }),
    defineField({
      name: 'monthOfWedding',
      title: 'Месяц свадьбы',
      type: 'string',
      options: {
        list: [
          {title: 'Январь', value: 'jan'},
          {title: 'Февраль', value: 'feb'},
          {title: 'Март', value: 'mar'},
          {title: 'Апрель', value: 'apr'},
          {title: 'Май', value: 'may'},
          {title: 'Июнь', value: 'jun'},
          {title: 'Июль', value: 'jul'},
          {title: 'Август', value: 'aug'},
          {title: 'Сентябрь', value: 'sep'},
          {title: 'Октябрь', value: 'oct'},
          {title: 'Ноябрь', value: 'nov'},
          {title: 'Декабрь', value: 'dec'},
        ],
      },
      fieldset: 'weddingDate',
    }),
    defineField({
      name: 'dayOfWedding',
      title: 'День свадьбы',
      type: 'number',
      fieldset: 'weddingDate',
      validation: (rule) => rule.min(1).max(31),
    }),

    defineField({
      name: 'notes',
      title: 'Заметки',
      type: 'text',
      rows: 3,
      description: 'Для админов. На сайте не видны.',
    }),
  ],
  preview: {
    select: {
      spouse1Name: 'spouse1Ref.name',
      spouse1Surname: 'spouse1Ref.surname',
      spouse2Name: 'spouse2Ref.name',
      spouse2Surname: 'spouse2Ref.surname',
      day: 'dayOfWedding',
      month: 'monthOfWedding',
      year: 'yearOfWedding',
    },
    prepare(selection) {
      const {spouse1Name, spouse1Surname, spouse2Name, spouse2Surname, day, month, year} = selection

      const spouse1FullName = `${spouse1Surname || ''} ${spouse1Name || ''}`.trim()
      const spouse2FullName = `${spouse2Surname || ''} ${spouse2Name || ''}`.trim()

      const monthInRussian = month ? MONTH_NAMES[month] : ''
      let weddingDate = ''
      if (day && monthInRussian && year) {
        weddingDate = `${day} ${monthInRussian} ${year} г.`
      } else if (monthInRussian && year) {
        weddingDate = `${monthInRussian} ${year} г.`
      } else if (year) {
        weddingDate = `${year} г.`
      }

      return {
        title:
          spouse1FullName && spouse2FullName
            ? `${spouse1FullName} ❤️ ${spouse2FullName}`
            : 'Неизвестный брак',
        subtitle: weddingDate ?? 'Дата свадьбы неизвестна',
        media: ConfettiIcon,
      }
    },
  },
})
