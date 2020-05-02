import React from 'react'

function Tooltip({tip}) {
	
	return (
		<div class="tooltip">
			<div>
				<div class="tooltip-tip">
					<p>{tip}</p>
				</div>
				<div class="tooltip-bottom"></div>
			</div>
		</div>
	)
}

export default Tooltip;