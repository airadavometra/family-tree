import {defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {MONTH_NAMES} from '../../constants/monthNames'

export default defineField({
  name: 'person',
  title: 'Люди',
  type: 'document',
  icon: UsersIcon,
  fieldsets: [
    {name: 'birthData', title: 'Данные о рождении'},
    {name: 'parents', title: 'Родители'},
    {name: 'deathData', title: 'Данные о смерти', description: 'Не заполнять, если человек жив.'},
  ],
  fields: [
    defineField({
      name: 'surname',
      title: 'Фамилия',
      type: 'string',
      description: 'Девичья фамилия для женщин в браке.',
    }),
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'string',
    }),
    defineField({
      name: 'parentalName',
      title: 'Отчество',
      type: 'string',
    }),
    defineField({
      name: 'sex',
      title: 'Пол',
      type: 'string',
      options: {
        list: [
          {title: 'Жен', value: 'woman'},
          {title: 'Муж', value: 'man'},
        ],
        layout: 'radio',
      },
      initialValue: 'woman',
    }),

    defineField({
      name: 'yearOfBirth',
      title: 'Год рождения',
      type: 'number',
      fieldset: 'birthData',
      validation: (rule) => rule.min(1).max(3000),
    }),
    defineField({
      name: 'monthOfBirth',
      title: 'Месяц рождения',
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
      fieldset: 'birthData',
    }),
    defineField({
      name: 'dayOfBirth',
      title: 'День рождения',
      type: 'number',
      fieldset: 'birthData',
      validation: (rule) => rule.min(1).max(31),
    }),
    defineField({
      name: 'placeOfBirth',
      title: 'Место рождения',
      type: 'string',
      fieldset: 'birthData',
    }),

    defineField({
      name: 'mother',
      title: 'Мать',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'woman'},
      },
      fieldset: 'parents',
    }),
    defineField({
      name: 'father',
      title: 'Отец',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'man'},
      },
      fieldset: 'parents',
    }),
    defineField({
      name: 'stepmother',
      title: 'Мачеха',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'woman'},
      },
      fieldset: 'parents',
    }),
    defineField({
      name: 'stepfather',
      title: 'Отчим',
      type: 'reference',
      to: [{type: 'person'}],
      options: {
        filter: 'sex == $sex',
        filterParams: {sex: 'man'},
      },
      fieldset: 'parents',
    }),

    defineField({
      name: 'spouses',
      title: 'Супруги',
      type: 'array',
      of: [
        {
          name: 'spouseRef',
          title: 'Супруг(а)',
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
    }),

    defineField({
      name: 'children',
      title: 'Дети',
      type: 'array',
      of: [
        {
          name: 'childRef',
          title: 'Ребенок',
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
    }),

    defineField({
      name: 'yearOfDeath',
      title: 'Год смерти',
      type: 'number',
      fieldset: 'deathData',
      validation: (rule) => rule.min(1).max(3000),
    }),
    defineField({
      name: 'monthOfDeath',
      title: 'Месяц смерти',
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
      fieldset: 'deathData',
    }),
    defineField({
      name: 'dayOfDeath',
      title: 'День смерти',
      type: 'number',
      fieldset: 'deathData',
      validation: (rule) => rule.min(1).max(31),
    }),
    defineField({
      name: 'placeOfDeath',
      title: 'Место смерти',
      type: 'string',
      fieldset: 'deathData',
    }),

    defineField({
      name: 'gallery',
      title: 'Галлерея',
      type: 'array',
      of: [
        {
          name: 'mediaRef',
          title: 'Изображение',
          type: 'reference',
          to: [{type: 'media'}],
        },
      ],
    }),

    defineField({
      name: 'bio',
      title: 'Биография',
      type: 'bio',
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
      surname: 'surname',
      name: 'name',
      parentalName: 'parentalName',
      day: 'dayOfBirth',
      month: 'monthOfBirth',
      year: 'yearOfBirth',
    },
    prepare(selection) {
      const {surname, name, parentalName, day, month, year} = selection

      const monthInRussian = month ? MONTH_NAMES[month] : ''
      let birthDate = ''
      if (day && monthInRussian && year) {
        birthDate = `${day} ${monthInRussian} ${year} г.`
      } else if (monthInRussian && year) {
        birthDate = `${monthInRussian} ${year} г.`
      } else if (year) {
        birthDate = `${year} г.`
      }

      return {
        title:
          surname || name || parentalName
            ? `${surname || 'Фамилия'} ${name || 'Имя'} ${parentalName || 'Отчество'}`
            : 'Неизвестный человек',
        subtitle: birthDate ? `Дата рождения: ${birthDate}` : 'Дата рождения неизвестна',
        media: UsersIcon,
      }
    },
  },
})
