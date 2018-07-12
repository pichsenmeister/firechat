let layout = {
	navbar: {
		orientation: 'top',
		type: 'horizontal'
	},
	leftSidebar: {
		component: 'conversation-list'
	},
	rightSidebar: {
		component: 'conversation-info'
	}
}

// either right or left sidebar must be visible to show conversation list
if (layout.leftSidebar.hidden && layout.rightSidebar.hidden) throw new Error('At least one sidebar must be visible to the ConversationList component')

// one of the sidebars needs to contain the ConversationList
if (!layout.leftSidebar.component === 'ConversationList' && !layout.rightSidebar.component === 'ConversationList') throw new Error('One of the sidebars needs to contain component ConversationList')

if (layout.navbar && !layout.navbar.type) throw new Error('Required navbar attribute "type" is missing')
if (layout.navbar && layout.navbar.type && !(layout.navbar.type === 'horizontal' || layout.navbar.type === 'vertical')) throw new Error('Wrong navbar attribute "type". It can either be "horizontal" or "vertical"')

export default layout
