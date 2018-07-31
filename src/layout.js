let layout = {
	style: 'comfort', // comfort || cozy || compact,
	message: {
		alignment: 'shared' // left || right || shared
	},
	/**
	 * Time formats for conversations and messages for when they were updated / sent:
	 *		day: at the same day
	 *		week: less than a week ago
	 *		month: longer than a week ago
	 *		year: longer than a year ago
	 */
	timeFormats: { // time format, see https://momentjs.com/docs/#/parsing/string-format/
		day: 'h:mma', // e.g. 1:25pm
		week: 'ddd', // e.g. Mon, Tue, ...
		month: 'MMM D', // e.g. March 14
		year: 'MMM D, YYYY' // e.g. March 14, 2017
	},
	navbar: {
		type: 'horizontal', // horizontal || vertical
		orientation: 'top' // horizontal: (top || bottom), vertical: (left || right)
	},
	leftSidebar: {
		component: 'conversation-list'
	},
	rightSidebar: {
		component: 'conversation-info',
		hidden: true
	},
	userPrefs: {
		leftSidebar: {},
		rightSidebar: {}
	}
}

// either right or left sidebar must be visible to show conversation list
if (layout.leftSidebar.hidden && layout.rightSidebar.hidden) throw new Error('At least one sidebar must be visible to the ConversationList component')

// one of the sidebars needs to contain the ConversationList
if (!layout.leftSidebar.component === 'ConversationList' && !layout.rightSidebar.component === 'ConversationList') throw new Error('One of the sidebars needs to contain component ConversationList')

if (layout.navbar && layout.navbar.type && !(layout.navbar.type === 'horizontal' || layout.navbar.type === 'vertical')) throw new Error('Wrong navbar attribute "type". It can either be "horizontal" or "vertical"')
if (layout.navbar && !layout.navbar.type) throw new Error('Required navbar attribute "type" is missing')

export default layout
