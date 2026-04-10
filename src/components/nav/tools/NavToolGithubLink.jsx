import React from 'react'
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"

function NavToolGithubLink() {
    const id = "github_link"
    const tooltip = "GitHub Profile"

    const options = [{
        id: id,
        faIcon: "fa-brands fa-github",
        label: tooltip
    }]

    const _onClick = () => {
        window.open("https://github.com/raushan-singh-eng", "_blank")
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_BUTTON}
                            options={options}
                            selectedOptionId={id}
                            onOptionSelected={_onClick}
                            tooltipLabel={tooltip}/>
    )
}

export default NavToolGithubLink
