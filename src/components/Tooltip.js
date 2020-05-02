import React from 'react'

function Tooltip({tip}) {
	
	return (
		<div className="tooltip">
			<div>
				<div className="tooltip-tip">
					<p>{tip}</p>
				</div>
				<div className="tooltip-bottom"></div>
			</div>
		</div>
	)
}

export default Tooltip;