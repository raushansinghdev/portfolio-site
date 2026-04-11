/**
 * @author Raushan Singh
 * @date 2025-05-10
 * @description This hook provides methods to interact with external APIs.
 */

import emailjs from "@emailjs/browser"
import {useConstants} from "/src/hooks/constants.js"
import {useUtils} from "/src/hooks/utils.js"

const constants = useConstants()
const utils = useUtils()

export const useApi = () => {
    return {
        validators,
        handlers,
        analytics
    }
}

const validators = {
    /**
     * @param {String} name
     * @param {String} email
     * @param {String} subject
     * @param {String} message
     */
    validateEmailRequest: (name, email, subject, message) => {
        const minWordCountForMessage = 3

        const validations = [
            { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,      errorCondition: !name || !email || !subject || !message },
            { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,             errorCondition: !utils.validation.validateEmail(email) },
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,    errorCondition: !utils.validation.isLongerThan(message, minWordCountForMessage),    messageParameter: minWordCountForMessage + 1},
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,      errorCondition: utils.validation.isSpam(message) },
        ]

        const error = validations.find(validation => validation.errorCondition)
        return {
            success: !error,
            errorCode: error?.errorCode,
            errorParameter: error?.messageParameter,
            bundle: {
                name: name,
                from_name: name,
                email: email,
                from_email: email,
                custom_subject: subject,
                title: subject,
                message: message,
                time: new Date().toLocaleString(),
                custom_source: utils.url.getAbsoluteLocation(),
                custom_source_name: "React Portfolio"
            }
        }
    }
}

const handlers = {
    /**
     * @return {Promise<{success: (*|boolean)}>}
     */
    dummyRequest: async () => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        window._dummyRequestSuccess = !window._dummyRequestSuccess

        return {
            success: window._dummyRequestSuccess
        }
    },

    /**
     * @param {Object} validationBundle
     * @param {String} publicKey
     * @param {String} serviceId
     * @param {String[]} templateIds
     * @return {Promise<{success: boolean}>}
     */
    sendEmailRequest: async (validationBundle, publicKey, serviceId, templateIds) => {
        emailjs.init(publicKey)

        const response = {success: false}
        const ids = Array.isArray(templateIds) ? templateIds : [templateIds]

        if (!ids || ids.length === 0 || !ids[0]) {
            console.error("EmailJS Error: No template IDs provided.", {templateIds})
            return response
        }

        try {
            for (const templateId of ids) {
                const result = await emailjs.send(serviceId, templateId, validationBundle)
                if (result.status !== 200) {
                    console.error(`EmailJS Error for template ${templateId}:`, result)
                    response.success = false
                    return response
                }
            }
            response.success = true
        } catch (error) {
            console.error("EmailJS Exception:", error)
            response.success = false
        }

        return response
    }
}

const analytics = {
    /**
     * @description This method can be used to report a visit to an external analytics service.
     * Here, you can integrate Google Analytics, Mixpanel, or your own custom analytics implementation.
     * @returns {Promise<void>}
     */
    reportVisit: async() => {
        try {
            await fetch("https://admin.raushansingh.com/api/analytics/mock", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    params: {
                        url: utils.url.getRootLocation(),
                        template_id: "react-portfolio"
                    }
                })
            })
        } catch (error) {
            // Silently handle analytics errors to prevent console noise
            // console.warn("Analytics reporting failed (likely CORS or server offline)");
        }
    }
}