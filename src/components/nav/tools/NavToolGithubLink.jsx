import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"

function NavToolGithubLink() {
    const language = useLanguage()
    const id = "github_link"
    const tooltip = language.getString("see_on_github")

    const options = [{
        id: id,
        faIcon: "fa-brands fa-github",
        label: tooltip
    }]

    const _onClick = () => {
        window.open("https://github.com/raushansinghdev", "_blank")
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
