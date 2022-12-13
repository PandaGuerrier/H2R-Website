import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import PhoneValidator from 'App/Validators/PhoneValidator'
const axios = require("axios");


export default class ProfilesController {
    public async index({ view }: HttpContextContract) {
        return view.render('profile/index')
    }

    public async phone({ view }: HttpContextContract) {
        return view.render('profile/phone')
    }

    public async verifyPhone({ response, request, auth, view }: HttpContextContract) {
        const data = await request.validate(PhoneValidator)
        const code = Math.floor(100000 + Math.random() * 900000)

        if(!auth.user) {
            return response.redirect().toRoute('login')
        }

        const options = {
            method: 'POST',
            url: 'https://3vnenj.api.infobip.com/sms/2/text/advanced',
            headers: {
                'Authorization': "App 0adc8f5deb40696848b668bea6392840-15d8959e-0da2-4fa8-b708-fd2722af4a41",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: JSON.stringify({
                "messages": [
                    {
                        "destinations": [
                            {
                                "to": "33" + data.number.substring(1)
                            }
                        ],
                        "from": "MineSchool",
                        "text": "Bonjour, merci de nous faire confiance.\n\nVotre code de vérification est : " + code + "\n\nCordialement,\nL'équipe MineSchool"
                    }
                ]
            }),
        };
        
        const user = await User.query().where('id', auth.user?.id).first()
        user!.numberPhoneCode = code
        await user?.save()

        const axiosResponse = await axios.request(options)
        if(axiosResponse.status !== 200) {
            return response.redirect().toRoute('profile.phone')
        }

        return view.render('profile/verifyPhone', {
            number: data.number,
            code: code
        })
    }

    public async verifyPhoneCode({ response, params, auth, request }: HttpContextContract) {
        if(!auth.user) {
            return response.redirect().toRoute('login')
        }

        const code = request.input('otp')
        console.log(code)

        const user = await User.query().where('id', auth.user?.id).first()
        console.log(user!.numberPhoneCode)

        if(user!.numberPhoneCode !== parseInt(code)) {
            return response.redirect().toRoute('phoneFail', {
                id: params.id
            })
        }

        user!.numberPhone = params.id
        user!.numberPhoneVerified = true
        user!.numberPhoneCode = 0
        await user?.save()

        return response.redirect().toRoute('profile')
    }

    public async phoneFail({ response, params, auth, view }: HttpContextContract) {
        if(!auth.user) {
            return response.redirect().toRoute('login')
        }

        return view.render('profile/phoneFail', {
            number: params.id
        })
    }
}
