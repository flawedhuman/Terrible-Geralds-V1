<template>
    <dialog>
        <div class="close-contact-form-wrap">
            <div class="logo-close-button-wrap">
                <img :src=tgLogo alt="Terrible Gerald's Logo">
                <button class="close-contact-form">X</button>
            </div>
            <p>
                At this time we are only licensed for sales in Nebraska. Sorry other states! 
            </p>
            <p>Book us for upcoming private events like graduation parties, birthdays, weddings and work lunches!</p>
        </div>
        <form method="dialog">
            <div v-if="!isFormSubmitted" class="items">
                <div>
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" v-model="name" />
                </div>
                <div>
                    <label for="email">Email Address</label>
                    <input type="text" name="email" id="email" v-model="email" />
                </div>
                <div>
                    <label for="phone">Phone Number</label>
                    <input type="text" name="phone" id="phone" v-model="phone" />
                </div>
                <div>
                    <label for="date">Event Date</label>
                    <input type="date" name="date" id="date" v-model="date" />
                </div>
                <div>
                    <label for="location">Event Location</label>
                    <input type="text" name="location" id="location" v-model="location" />
                </div>
                <div>
                    <label for="count">Estimated Guest Count</label>
                    <input type="text" name="count" id="count" v-model="count" />
                </div>
                <div>
                    <label for="grapevine">How Did You Hear About Us?</label>
                    <input type="text" name="grapevine" id="grapevine" v-model="grapevine" />
                </div>
                <div>
                    <label for="message">Additional Info</label>
                    <textarea id="message" name="message" rows="6" v-model="message"></textarea>
                </div>
                <span class="error">{{error}}</span>
                <button class="btn btn-secondary" @click.prevent="submit">Submit</button>
            </div>
            <div v-if="isFormSubmitted">
                <h1>Thank you for submitting the form. We will be in touch!</h1>
            </div>
        </form>
    </dialog>
</template>

<script>

export default {

    data() {
        return {
            name: "",
            email: "",
            phone: "",
            date: "",
            location: "",
            count: "",
            grapevine: "",
            message: "",
            error: "",
            isFormSubmitted: false,
            tgLogo: "/images/tg-logo.webp"
        };
    },
    methods: {

        submit() {
            if (this.name == "" || this.email == "" || this.phone == "" || this.date == "" || this.location == "" || this.count == "" || this.grapevine == "" || this.message == "") {
                this.error = "Please fill out all the form fields";
                return;
            } else {
                this.error = "";
            }

            const formData = new FormData();        
            formData.append("name", this.name);
            formData.append("email", this.email);
            formData.append("phone", this.phone);
            formData.append("date", this.date);
            formData.append("location", this.location);
            formData.append("count", this.count);
            formData.append("grapevine", this.grapevine);
            formData.append("message", this.message);

            fetch("https://getform.io/f/64e182fc-b375-4a84-8da2-0b9ab51b2abe", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            })
            .then(response => this.isFormSubmitted = true)
            .catch(error => console.log(error))
        },
    },
}
</script>
<style>

    .items {
        padding-inline: 1rem;
        display: flex;
        min-width: 600px;
        flex-direction: column;
        gap: 1.25rem;       
    }

    @media (max-width: 700px) {
    
        .items {
            margin-bottom: 4rem;
            padding: 0;
            min-width: 250px;
            max-width: 550px;
        }

    }

    .close-contact-form-wrap {
        padding-left: 1rem;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        text-align: left;
        align-items: center;
        justify-content: space-between;
    }

    .close-contact-form-wrap p:first-of-type {
        margin: 0;
        font-weight: 600;
        line-height: 1.2;
    }

    @media (max-width: 700px) {

        .close-contact-form-wrap {
            padding-left: 0;
            max-width: 550px;
        }

    }

    .logo-close-button-wrap {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
    }

    .logo-close-button-wrap img {
        max-width: 250px;
    }

    #full-screen-wrap button.close-contact-form {
        font-size: 2.5rem;
        text-align: right;
        background-color: transparent;
        border: none;
        font-weight: 900;
        font-family: var(--font-headline);
        cursor: pointer;
        color: rgba(245, 9, 36, 1);
    }

    #full-screen-wrap button.close-contact-form:is(:hover, :focus) {
        color: #000;
        rotate: 5deg;
    }

    .items label {
        margin-bottom: 0.5rem;
        display: block;
        font-family: var(--font-headline);
        font-size: 1.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    .items input, .items textarea {
        padding: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
        border: 2px #000 solid;
        outline: none;
        font-size: 1.8rem;
    }

    .items .btn.btn-primary {
        margin-top: 0;
        border-color: #000;
        font-size: 2em;
        font-weight: 400;
        font-family: var(--font-headline);
        text-transform: uppercase;
    }

    .error {
        text-align: center;
        font-size: 1.85rem;
        border-bottom: 3px #000 solid;
        rotate: 1deg;
        font-weight: 600;
        font-family: var(--font-headline);
        color: var(--tg-red);
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.9);
    }

</style>