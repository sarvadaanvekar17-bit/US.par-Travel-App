const DESTINATION_PRICES = {
    Goa: 18000,
    Kerala: 22000,
    Rajasthan: 20000,
    Ladakh: 32000,
    Manali: 16000,
    Jaipur: 19000,
    Bali: 130000,
    Paris: 223000,
    Switzerland: 73000,
    Kenya: 67000,
    "New York": 165000,
    "Rio de Janeiro": 120000,
    Sydney: 150000,
    Antarctica: 200000
};

const unsplashImage = (id) => `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

const DESTINATION_GALLERY_KEYWORDS = {
    Goa: ["Goa beach", "Calangute beach", "Baga beach", "Goa nightclub", "Goa nature", "Goa seafood thali"],
    Kerala: ["Alleppey backwaters", "Munnar tea gardens", "Kovalam beach", "Periyar National Park", "Fort Kochi", "Varkala beach", "Kerala thali"],
    Rajasthan: ["Amber Fort", "Hawa Mahal", "Jaisalmer Fort", "Udaipur City Palace", "Ranthambore National Park", "Pushkar Lake", "Rajasthani thali"],
    Ladakh: ["Pangong Lake", "Nubra Valley", "Khardung La", "Thiksey Monastery", "Lamayuru Monastery", "Hemis Monastery", "Ladakhi thali"],
    Manali: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Manali Mall Road", "Beas River", "Vashisht hot springs", "Himachali thali"],
    Jaipur: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort", "Galtaji Temple", "Jaipur thali"],
    Bali: ["Tanah Lot", "Uluwatu Temple", "Tirta Empul", "Besakih Temple", "Ubud Bali", "Kuta Beach", "Babi guling"],
    Paris: ["Eiffel Tower", "Parisian cafe", "Paris hotel Eiffel Tower view", "Louvre Museum", "Seine river Paris", "Montmartre", "Paris bistro food"],
    Switzerland: ["Jungfraujoch", "Matterhorn", "Lake Lucerne", "Zermatt", "Interlaken", "Chillon Castle", "Cheese fondue Switzerland"],
    Kenya: ["Masai Mara", "Nairobi city", "Kenya cafe", "Amboseli National Park", "Diani Beach", "Lake Nakuru", "Nyama choma"],
    "New York": ["Brooklyn Bridge", "Manhattan Bridge", "Times Square", "Central Park", "Statue of Liberty", "Empire State Building", "New York restaurant food"],
    "Rio de Janeiro": ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach", "Ipanema Beach", "Tijuca Forest", "Maracanã Stadium", "Feijoada"],
    Sydney: ["Sydney Opera House", "Sydney Harbour Bridge", "Bondi Beach", "Darling Harbour", "Taronga Zoo", "Royal Botanic Garden Sydney", "Sydney seafood"],
    Antarctica: ["Antarctic Peninsula", "South Georgia", "Deception Island", "Port Lockroy", "Antarctica wildlife", "Antarctic icebergs", "Antarctica research station food"]
};

const DESTINATION_PRIMARY_IMAGES = {
    Goa: unsplashImage("photo-1650747808629-d0d83c607ba4"),
    Kerala: unsplashImage("photo-1670332941539-954ad1186540"),
    Rajasthan: unsplashImage("photo-1716534133704-5a5c2a9c7512"),
    Ladakh: unsplashImage("photo-1675162887692-242726e35f00"),
    Manali: unsplashImage("photo-1711943728939-d50142512e5b"),
    Jaipur: unsplashImage("photo-1738508951420-525855fb8d56"),
    Bali: unsplashImage("photo-1537996194471-e657df975ab4"),
    Paris: unsplashImage("photo-1502602898657-3e91760cbb34"),
    Switzerland: unsplashImage("photo-1531366936337-7c912a4589a7"),
    Kenya: unsplashImage("photo-1745526220488-6d7b179ac084"),
    "New York": unsplashImage("photo-1761300560840-0493d5728f4a"),
    "Rio de Janeiro": unsplashImage("photo-1711235312789-f33efa18e0c1"),
    Sydney: unsplashImage("photo-1748243262890-bffad63a7807"),
    Antarctica: unsplashImage("photo-1745282322383-8ec67cc895b6")
};

const BOOKING_STORAGE_KEY = "chalechaloBookings";
const USER_STORAGE_KEY = "chalechaloUsers";
const SESSION_STORAGE_KEY = "chalechaloSession";
const THEME_STORAGE_KEY = "chalechaloTheme";
const PASSWORD_RESET_STORAGE_KEY = "chalechaloPasswordReset";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const formatINR = (amount) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
}).format(amount || 0);

const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const todayInputValue = () => new Date().toISOString().split("T")[0];

const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function initNavbar() {
    const navbar = $("#siteNavbar");
    if (!navbar) return;

    const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 24);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initReveal() {
    const revealItems = $$(".reveal");
    if (!revealItems.length) return;

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
}

function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.count || 0);
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased).toLocaleString("en-IN");
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach((counter) => {
            counter.textContent = Number(counter.dataset.count || 0).toLocaleString("en-IN");
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach((counter) => observer.observe(counter));
}

function initDestinationFilters() {
    const buttons = $$(".filter-btn");
    const cards = $$("#destinationGrid .travel-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";
            buttons.forEach((item) => item.classList.toggle("active", item === button));
            cards.forEach((card) => {
                const categories = (card.dataset.categories || "").split(" ");
                const matches = filter === "all" || categories.includes(filter);
                card.classList.toggle("hidden", !matches);
            });
        });
    });
}

function getBookings() {
    try {
        return JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveBookings(bookings) {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings.slice(0, 20)));
}

function setFieldInvalid(field, invalid) {
    field?.classList.toggle("is-invalid", invalid);
}

function validateBookingForm(form) {
    const fields = {
        name: $("#name", form),
        email: $("#email", form),
        phone: $("#phone", form),
        destination: $("#destination", form),
        date: $("#date", form),
        travellers: $("#travellers", form)
    };

    const checks = {
        name: Boolean(fields.name?.value.trim()),
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email?.value.trim() || ""),
        phone: /^[+\d][\d\s()-]{7,}$/.test(fields.phone?.value.trim() || ""),
        destination: Boolean(fields.destination?.value),
        date: Boolean(fields.date?.value),
        travellers: Number(fields.travellers?.value) >= 1 && Number(fields.travellers?.value) <= 20
    };

    Object.entries(fields).forEach(([key, field]) => setFieldInvalid(field, !checks[key]));
    return Object.values(checks).every(Boolean);
}

function sprinkleMoney() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.createElement("div");
    layer.className = "money-rain";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 90; i += 1) {
        const bit = document.createElement("span");
        bit.className = "money-bit";
        bit.textContent = i % 5 === 0 ? "₹₹" : "₹";
        bit.style.left = `${Math.random() * 100}vw`;
        bit.style.top = `${-5 - Math.random() * 10}vh`;
        bit.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
        bit.style.setProperty("--duration", `${1.6 + Math.random() * 1.4}s`);
        bit.style.setProperty("--delay", `${Math.random() * 0.5}s`);
        bit.style.fontSize = `${14 + Math.random() * 18}px`;
        layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    window.setTimeout(() => layer.remove(), 3600);
}

function playBookingSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const coinFreqs = [1318.5, 1568, 1760, 2093, 2637, 3136];
        coinFreqs.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.value = freq;
            const start = ctx.currentTime + index * 0.07;
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.16, start + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
            osc.connect(gain).connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.22);
        });
        window.setTimeout(() => ctx.close(), 900);
    } catch {
        // Audio is optional in demo mode.
    }
}

function initBookingPage() {
    const form = $("#bookingForm");
    const confirmation = $("#confirmation");
    const bookingList = $("#bookingList");
    const clearBookings = $("#clearBookings");
    if (!form) return;

    const destination = $("#destination", form);
    const date = $("#date", form);
    const travellers = $("#travellers", form);
    const decrease = $("#decreaseTravellers");
    const increase = $("#increaseTravellers");

    const summaryDestination = $("#summaryDestination");
    const summaryDate = $("#summaryDate");
    const summaryTravellers = $("#summaryTravellers");
    const summaryRate = $("#summaryRate");
    const summaryTotal = $("#summaryTotal");

    if (date) date.min = todayInputValue();

    const params = new URLSearchParams(window.location.search);
    if (destination && params.get("destination") && Object.prototype.hasOwnProperty.call(DESTINATION_PRICES, params.get("destination"))) {
        destination.value = params.get("destination");
    }
    if (date && params.get("date")) date.value = params.get("date");
    if (travellers && params.get("travellers")) {
        travellers.value = Math.min(20, Math.max(1, Number(params.get("travellers")) || 1));
    }

    const travellerCount = () => Math.min(20, Math.max(1, Number(travellers?.value) || 1));

    const updateSummary = () => {
        const selectedDestination = destination?.value || "";
        const perPerson = DESTINATION_PRICES[selectedDestination] || 0;
        const count = travellerCount();
        const total = perPerson * count;

        if (summaryDestination) summaryDestination.textContent = selectedDestination || "Not selected";
        if (summaryDate) summaryDate.textContent = formatDate(date?.value);
        if (summaryTravellers) summaryTravellers.textContent = String(count);
        if (summaryRate) summaryRate.textContent = perPerson ? `${formatINR(perPerson)} / person` : "Select a destination";
        if (summaryTotal) summaryTotal.textContent = formatINR(total);
        if (travellers) travellers.value = count;
    };

    const adjustTravellers = (amount) => {
        if (!travellers) return;
        travellers.value = travellerCount() + amount;
        updateSummary();
    };

    decrease?.addEventListener("click", () => adjustTravellers(-1));
    increase?.addEventListener("click", () => adjustTravellers(1));
    form.addEventListener("input", updateSummary);
    form.addEventListener("change", updateSummary);
    updateSummary();

    const renderBookings = () => {
        if (!bookingList) return;
        const bookings = getBookings();
        bookingList.innerHTML = "";

        if (!bookings.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.textContent = "No saved bookings yet. Your confirmed requests will appear here.";
            bookingList.appendChild(empty);
            return;
        }

        bookings.forEach((booking) => {
            const item = document.createElement("article");
            item.className = "booking-item";

            const details = document.createElement("div");
            const title = document.createElement("strong");
            title.textContent = `${booking.destination} · ${booking.tripType || "Leisure"}`;
            const meta = document.createElement("p");
            meta.textContent = `${booking.name} · ${formatDate(booking.date)} · ${booking.travellers} traveller${Number(booking.travellers) === 1 ? "" : "s"} · ${formatINR(booking.total)} · ${booking.status || "Saved"}`;
            details.append(title, meta);

            const viewTicket = document.createElement("button");
            viewTicket.type = "button";
            viewTicket.className = "btn btn-outline-burgundy btn-sm";
            viewTicket.textContent = "View ticket";
            viewTicket.addEventListener("click", () => showTicketPreview(booking));

            const remove = document.createElement("button");
            remove.type = "button";
            remove.className = "btn btn-outline-burgundy btn-sm";
            remove.textContent = "Remove";
            remove.addEventListener("click", () => {
                saveBookings(getBookings().filter((saved) => saved.id !== booking.id));
                renderBookings();
            });

            const actions = document.createElement("div");
            actions.className = "booking-item-actions";
            actions.append(viewTicket, remove);

            item.append(details, actions);
            bookingList.appendChild(item);
        });
    };

    clearBookings?.addEventListener("click", () => {
        saveBookings([]);
        renderBookings();
    });

    let pendingBooking = null;
    let lastPaidBooking = null;
    let previewBooking = null;

    const ticketCardHTML = (booking) => {
        const serviceFee = Math.min(499, Math.max(99, Math.round(booking.total * 0.01)));
        const travelCost = Math.round((booking.total - serviceFee) / 1.05);
        const gst = booking.total - serviceFee - travelCost;
        return `
        <div class="print-ticket-card ticket-sheet">
            <div class="print-ticket-head">
                <span>US.par</span>
                <strong>${escapeHTML(booking.status || "Paid")}</strong>
            </div>
            <h1>Travel ticket</h1>
            <p class="print-ticket-sub">${escapeHTML(booking.destination)} · ${escapeHTML(booking.tripType || "Leisure")}</p>
            <div class="print-ticket-rows">
                <div><span>Passenger</span><strong>${escapeHTML(booking.name)}</strong></div>
                <div><span>Booking ID</span><strong>${escapeHTML(booking.reference || booking.id)}</strong></div>
                <div><span>Travel date</span><strong>${formatDate(booking.date)}</strong></div>
                <div><span>Travellers</span><strong>${booking.travellers}</strong></div>
                <div><span>Payment method</span><strong>${escapeHTML(booking.paymentMethod === "upi" ? "UPI" : booking.paymentMethod === "installments" ? "Two batches" : "Card")}</strong></div>
                <div><span>Amount paid</span><strong>${formatINR(booking.paidAmount ?? booking.total)}</strong></div>
                ${Number(booking.balanceDue) > 0 ? `<div><span>Balance due</span><strong>${formatINR(booking.balanceDue)}</strong></div>` : ""}
                <div><span>Email</span><strong>${escapeHTML(booking.email || "—")}</strong></div>
                <div><span>Phone</span><strong>${escapeHTML(booking.phone || "—")}</strong></div>
                <div><span>Travel cost</span><strong>${formatINR(travelCost)}</strong></div>
                <div><span>GST (5%)</span><strong>${formatINR(gst)}</strong></div>
                <div><span>Service & booking fee</span><strong>${formatINR(serviceFee)}</strong></div>
            </div>
            <div class="print-ticket-total"><span>Total payable</span><strong>${formatINR(booking.total)}</strong></div>
            <p class="print-ticket-note">Travel cost, GST and service fees are included in the total and valid for the selected travel charges.</p>
            <p class="print-ticket-note">Cancellation policy: free up to 72 hours before travel; 50% refund from 48–72 hours; non-refundable within 48 hours or no-show.</p>
            <div class="print-ticket-footer"><span>Generated ${new Date().toLocaleDateString("en-IN")}</span><span>US.par</span></div>
        </div>`;
    };

    const printTicket = (booking) => {
        let ticket = $("#printTicket");
        if (!ticket) {
            ticket = document.createElement("div");
            ticket.id = "printTicket";
            ticket.className = "print-ticket";
            document.body.appendChild(ticket);
        }
        ticket.innerHTML = ticketCardHTML(booking);
        document.body.classList.add("printing-ticket");
        const cleanup = () => {
            document.body.classList.remove("printing-ticket");
            window.removeEventListener("afterprint", cleanup);
        };
        window.addEventListener("afterprint", cleanup);
        window.print();
        window.setTimeout(() => {
            if (document.body.classList.contains("printing-ticket")) document.body.classList.remove("printing-ticket");
        }, 1000);
    };

    const ticketPreview = $("#ticketPreview");
    const ticketPreviewBody = $("#ticketPreviewBody");
    const closeTicketPreview = $("#closeTicketPreview");
    const closeTicketPreviewAlt = $("#closeTicketPreviewAlt");
    const printTicketButton = $("#printTicketButton");

    const showTicketPreview = (booking) => {
        if (!ticketPreview || !ticketPreviewBody) {
            printTicket(booking);
            return;
        }
        previewBooking = booking;
        ticketPreviewBody.innerHTML = ticketCardHTML(booking);
        ticketPreview.hidden = false;
        ticketPreview.classList.add("is-open");
        document.body.classList.add("ticket-preview-open");
    };

    const hideTicketPreview = () => {
        if (!ticketPreview) return;
        ticketPreview.hidden = true;
        ticketPreview.classList.remove("is-open");
        document.body.classList.remove("ticket-preview-open");
        previewBooking = null;
    };

    closeTicketPreview?.addEventListener("click", hideTicketPreview);
    closeTicketPreviewAlt?.addEventListener("click", hideTicketPreview);
    ticketPreview?.addEventListener("click", (event) => {
        if (event.target === ticketPreview) hideTicketPreview();
    });
    printTicketButton?.addEventListener("click", () => {
        if (previewBooking) printTicket(previewBooking);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateBookingForm(form)) {
            if (confirmation) {
                confirmation.className = "confirmation-card show error";
                confirmation.innerHTML = '<h3>Almost there</h3><p>Please complete all required fields with valid details.</p>';
            }
            return;
        }

        const data = new FormData(form);
        const perPerson = DESTINATION_PRICES[data.get("destination")] || 0;
        const travellerTotal = Number(data.get("travellers")) || 1;
        pendingBooking = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: data.get("name").trim(),
            email: data.get("email").trim(),
            phone: data.get("phone").trim(),
            destination: data.get("destination"),
            date: data.get("date"),
            travellers: travellerTotal,
            tripType: data.get("tripType") || "Leisure",
            notes: data.get("notes")?.trim() || "",
            total: perPerson * travellerTotal,
            createdAt: new Date().toISOString(),
            status: "Pending payment"
        };

        if (confirmation) {
            confirmation.className = "confirmation-card show";
            confirmation.innerHTML = `
                <h3>Review booking request</h3>
                <p>Thank you, ${escapeHTML(pendingBooking.name)}. Please review your ${escapeHTML(pendingBooking.tripType.toLowerCase())} trip to <strong>${escapeHTML(pendingBooking.destination)}</strong>.</p>
                <p>${formatDate(pendingBooking.date)} · ${pendingBooking.travellers} traveller${pendingBooking.travellers === 1 ? "" : "s"}</p>
                <p><strong>Estimated total:</strong> ${formatINR(pendingBooking.total)}</p>
                <div class="review-actions">
                    <button type="button" class="btn btn-burgundy" id="proceedToPayment">Proceed to Payment</button>
                    <button type="button" class="btn btn-outline-burgundy" id="editBooking">Edit Details</button>
                </div>
            `;
        }
    });

    confirmation?.addEventListener("click", (event) => {
        if (event.target.closest("#downloadTicket") && lastPaidBooking) {
            showTicketPreview(lastPaidBooking);
        }
        if (event.target.closest("#proceedToPayment")) {
            openPaymentModal();
        }
        if (event.target.closest("#editBooking")) {
            confirmation.classList.remove("show");
            $("#name", form)?.focus();
        }
    });

    const paymentModalElement = $("#paymentModal");
    const paymentForm = $("#paymentForm");
    const paymentMessage = $("#paymentMessage");
    const cardNumber = $("#cardNumber");
    const cardExpiry = $("#cardExpiry");
    const cardCvv = $("#cardCvv");
    const cardName = $("#cardName");
    const cardNumberPreview = $("#cardNumberPreview");
    const cardNamePreview = $("#cardNamePreview");
    const cardExpiryPreview = $("#cardExpiryPreview");
    const paymentTotal = $("#paymentTotal");
    const paymentTotalLabel = $("#paymentTotalLabel");
    const payNowButton = $("#payNowButton");
    const paymentMethodInputs = $$(".payment-method input", paymentForm || document);
    const cardPaymentFields = $("#cardPaymentFields", paymentForm || document);
    const upiPaymentFields = $("#upiPaymentFields", paymentForm || document);
    const installmentPaymentFields = $("#installmentPaymentFields", paymentForm || document);
    const upiId = $("#upiId", paymentForm || document);
    const paymentModal = paymentModalElement && window.bootstrap?.Modal
        ? new window.bootstrap.Modal(paymentModalElement)
        : null;

    const digitsOnly = (value) => String(value || "").replace(/\D/g, "");
    const formatCardNumber = (value) => digitsOnly(value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    const formatExpiry = (value) => {
        const digits = digitsOnly(value).slice(0, 4);
        return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    };

    const updateCardPreview = () => {
        if (cardNumberPreview) cardNumberPreview.textContent = formatCardNumber(cardNumber?.value) || "•••• •••• •••• ••••";
        if (cardNamePreview) cardNamePreview.textContent = cardName?.value.trim().toUpperCase() || "YOUR NAME";
        if (cardExpiryPreview) cardExpiryPreview.textContent = cardExpiry?.value || "MM/YY";
    };

    cardNumber?.addEventListener("input", () => {
        cardNumber.value = formatCardNumber(cardNumber.value);
        updateCardPreview();
    });
    cardExpiry?.addEventListener("input", () => {
        cardExpiry.value = formatExpiry(cardExpiry.value);
        updateCardPreview();
    });
    cardName?.addEventListener("input", updateCardPreview);

    const selectedPaymentMethod = () => paymentMethodInputs.find((input) => input.checked)?.value || "card";
    const paymentCharge = () => selectedPaymentMethod() === "installments"
        ? Math.ceil((pendingBooking?.total || 0) / 2)
        : pendingBooking?.total || 0;

    const updatePaymentMethodFields = () => {
        const method = selectedPaymentMethod();
        if (cardPaymentFields) cardPaymentFields.hidden = method !== "card";
        if (upiPaymentFields) upiPaymentFields.hidden = method !== "upi";
        if (installmentPaymentFields) installmentPaymentFields.hidden = method !== "installments";
        if (paymentTotalLabel) paymentTotalLabel.textContent = method === "installments" ? "Batch 1 payable" : "Amount payable";
        if (paymentTotal) paymentTotal.textContent = formatINR(paymentCharge());
        if (payNowButton) payNowButton.textContent = `Pay ${formatINR(paymentCharge())}`;
    };

    paymentMethodInputs.forEach((input) => input.addEventListener("change", updatePaymentMethodFields));

    function openPaymentModal() {
        if (!pendingBooking) return;
        paymentForm?.reset();
        const cardRadio = paymentMethodInputs.find((input) => input.value === "card");
        if (cardRadio) cardRadio.checked = true;
        if (cardName) cardName.value = pendingBooking.name;
        updateCardPreview();
        updatePaymentMethodFields();
        if (paymentMessage) {
            paymentMessage.className = "confirmation-card";
            paymentMessage.innerHTML = "";
        }
        paymentModal?.show();
    }

    paymentForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!pendingBooking) return;

        const method = selectedPaymentMethod();
        const cardDigits = digitsOnly(cardNumber?.value);
        const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry?.value.trim() || "");
        const cvvValid = /^\d{3,4}$/.test(cardCvv?.value.trim() || "");
        const nameValid = Boolean(cardName?.value.trim());
        const upiValid = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId?.value.trim() || "");
        const checks = method === "card"
            ? {
                cardNumber: cardDigits.length === 16,
                cardExpiry: expiryValid,
                cardCvv: cvvValid,
                cardName: nameValid
            }
            : method === "upi"
                ? { upiId: upiValid }
                : { installments: true };

        const fields = method === "card"
            ? { cardNumber, cardExpiry, cardCvv, cardName }
            : method === "upi"
                ? { upiId }
                : {};

        Object.entries(checks).forEach(([key, valid]) => setFieldInvalid(fields[key], !valid));
        [cardNumber, cardExpiry, cardCvv, cardName].forEach((field) => {
            if (method !== "card") setFieldInvalid(field, false);
        });
        if (method !== "upi") setFieldInvalid(upiId, false);

        if (!Object.values(checks).every(Boolean)) {
            if (paymentMessage) {
                paymentMessage.className = "confirmation-card show error";
                paymentMessage.innerHTML = method === "upi"
                    ? '<h3>Check UPI ID</h3><p>Enter a valid UPI ID like name@upi.</p>'
                    : '<h3>Check payment details</h3><p>Enter a valid 16-digit card number, MM/YY expiry, CVV, and cardholder name.</p>';
            }
            return;
        }

        const chargeAmount = paymentCharge();
        const referencePrefix = method === "upi" ? "UPI-" : method === "installments" ? "INS-" : "CC-";

        if (payNowButton) {
            payNowButton.disabled = true;
            payNowButton.textContent = "Processing...";
        }

        setTimeout(() => {
            if (method === "card" && cardDigits === "4000000000000002") {
                if (paymentMessage) {
                    paymentMessage.className = "confirmation-card show error";
                    paymentMessage.innerHTML = '<h3>Payment declined</h3><p>This test card was declined. Try 4242 4242 4242 4242 for a successful payment.</p>';
                }
                if (payNowButton) {
                    payNowButton.disabled = false;
                    payNowButton.textContent = `Pay ${formatINR(chargeAmount)}`;
                }
                return;
            }

            const paidBooking = {
                ...pendingBooking,
                status: method === "installments" ? "Confirmed · Batch 1 paid" : "Paid",
                paymentMethod: method,
                paidAmount: chargeAmount,
                balanceDue: pendingBooking.total - chargeAmount,
                reference: referencePrefix + Math.floor(100000 + Math.random() * 900000),
                paidAt: new Date().toISOString()
            };

            lastPaidBooking = paidBooking;
            sprinkleMoney();
            playBookingSound();
            saveBookings([paidBooking, ...getBookings()]);
            renderBookings();
            pendingBooking = null;
            paymentModal?.hide();
            form.reset();
            updateSummary();

            if (confirmation) {
                confirmation.className = "confirmation-card show success";
                confirmation.innerHTML = `
                    <div class="ticket">
                        <div class="ticket-top">
                            <div>
                                <span class="ticket-eyebrow">US.par</span>
                                <h3>Booking confirmed</h3>
                            </div>
                            <span class="ticket-status">${escapeHTML(paidBooking.status || "Paid")}</span>
                        </div>
                        <div class="ticket-body">
                            <div class="ticket-row"><span>Passenger</span><strong>${escapeHTML(paidBooking.name)}</strong></div>
                            <div class="ticket-row"><span>Booking ID</span><strong>${escapeHTML(paidBooking.reference)}</strong></div>
                            <div class="ticket-row"><span>Destination</span><strong>${escapeHTML(paidBooking.destination)}</strong></div>
                            <div class="ticket-row"><span>Travel date</span><strong>${formatDate(paidBooking.date)}</strong></div>
                            <div class="ticket-row"><span>Travellers</span><strong>${paidBooking.travellers}</strong></div>
                            <div class="ticket-row"><span>Trip type</span><strong>${escapeHTML(paidBooking.tripType)}</strong></div>
                            <div class="ticket-row"><span>Payment method</span><strong>${escapeHTML(paidBooking.paymentMethod === "upi" ? "UPI" : paidBooking.paymentMethod === "installments" ? "Two batches" : "Card")}</strong></div>
                            <div class="ticket-row wide"><span>Amount paid</span><strong>${formatINR(paidBooking.paidAmount ?? paidBooking.total)}</strong></div>
                            ${Number(paidBooking.balanceDue) > 0 ? `<div class="ticket-row wide"><span>Balance due</span><strong>${formatINR(paidBooking.balanceDue)}</strong></div>` : ""}
                        </div>
                        <div class="ticket-stub">
                            <div><small>Reference</small><strong>${escapeHTML(paidBooking.reference)}</strong></div>
                            <div class="ticket-barcode" aria-hidden="true"></div>
                            <span class="ticket-status">Confirmed</span>
                        </div>
                        <div class="ticket-actions"><button type="button" id="downloadTicket" class="btn btn-burgundy">Download PDF</button></div>
                    </div>`;
            }

            if (payNowButton) {
                payNowButton.disabled = false;
                payNowButton.textContent = `Pay ${formatINR(chargeAmount)}`;
            }
        }, 1300);
    });

    renderBookings();
}

function initContactForm() {
    const form = $("#contactForm");
    const confirmation = $("#contactConfirmation");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $("#contactName", form);
        const email = $("#contactEmail", form);
        const subject = $("#contactSubject", form);
        const message = $("#contactMessage", form);

        const valid = [name, email, subject, message].every((field) => field.value.trim());
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

        [name, email, subject, message].forEach((field) => setFieldInvalid(field, !field.value.trim()));
        setFieldInvalid(email, !emailValid);

        if (!valid || !emailValid) {
            if (confirmation) {
                confirmation.classList.add("show");
                confirmation.innerHTML = '<h3>Message not sent</h3><p>Please complete all required fields with a valid email address.</p>';
            }
            return;
        }

        if (confirmation) {
            confirmation.classList.add("show");
            confirmation.innerHTML = `<h3>Message sent</h3><p>Thank you, ${escapeHTML(name.value.trim())}. We received your ${escapeHTML(subject.value.toLowerCase())} inquiry and will reply soon.</p>`;
        }
        form.reset();
    });
}

const getStoredJSON = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch {
        return fallback;
    }
};

const saveStoredJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getUsers = () => getStoredJSON(USER_STORAGE_KEY, []);
const saveUsers = (users) => saveStoredJSON(USER_STORAGE_KEY, users);
const getSessionUser = () => getStoredJSON(SESSION_STORAGE_KEY, null);
const setSessionUser = (user) => saveStoredJSON(SESSION_STORAGE_KEY, user);
const clearSessionUser = () => localStorage.removeItem(SESSION_STORAGE_KEY);

function fallbackHash(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return `fallback-${(hash >>> 0).toString(16)}`;
}

async function hashPassword(password) {
    if (globalThis.crypto?.subtle) {
        const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    return fallbackHash(password);
}

function safeRedirectTarget(fallback = "home.html") {
    const next = new URLSearchParams(window.location.search).get("next");
    return next && /^[a-zA-Z0-9_-]+\.html$/.test(next) ? next : fallback;
}

function showAuthMessage(element, type, title, body = "") {
    if (!element) return;
    element.className = `confirmation-card show ${type}`;
    element.innerHTML = `<h3>${escapeHTML(title)}</h3>${body ? `<p>${escapeHTML(body)}</p>` : ""}`;
}

const getPasswordReset = () => getStoredJSON(PASSWORD_RESET_STORAGE_KEY, null);
const savePasswordReset = (value) => saveStoredJSON(PASSWORD_RESET_STORAGE_KEY, value);
const clearPasswordReset = () => localStorage.removeItem(PASSWORD_RESET_STORAGE_KEY);

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

function getValidPasswordReset() {
    const record = getPasswordReset();
    if (!record?.phone) return null;
    if (Date.now() > record.expiresAt) {
        clearPasswordReset();
        return null;
    }
    return record;
}

function generateOtp() {
    if (globalThis.crypto?.getRandomValues) {
        const values = new Uint32Array(1);
        globalThis.crypto.getRandomValues(values);
        return String(values[0] % 1000000).padStart(6, "0");
    }
    return String(Math.floor(100000 + Math.random() * 900000));
}

async function createPasswordResetOtp(phone) {
    const otp = generateOtp();
    const otpHash = await hashPassword(otp);
    savePasswordReset({
        phone,
        otpHash,
        expiresAt: Date.now() + OTP_TTL_MS,
        attempts: 0,
        verified: false
    });
    return otp;
}

async function verifyPasswordResetOtp(otp) {
    const record = getValidPasswordReset();
    if (!record) {
        return { ok: false, expired: true, message: "Your verification code expired. Request a new one." };
    }
    if (record.attempts >= OTP_MAX_ATTEMPTS) {
        clearPasswordReset();
        return { ok: false, expired: true, message: "Too many incorrect attempts. Request a new code." };
    }

    const otpHash = await hashPassword(otp);
    if (otpHash !== record.otpHash) {
        record.attempts += 1;
        savePasswordReset(record);
        return {
            ok: false,
            message: `Incorrect code. ${OTP_MAX_ATTEMPTS - record.attempts} attempt${OTP_MAX_ATTEMPTS - record.attempts === 1 ? "" : "s"} left.`
        };
    }

    record.attempts = 0;
    record.verified = true;
    savePasswordReset(record);
    return { ok: true };
}

function getVerifiedPasswordReset() {
    const record = getValidPasswordReset();
    return record?.verified ? record : null;
}

function initForgotPasswordPage() {
    const emailStep = $("#forgotEmailStep");
    const otpStep = $("#forgotOtpStep");
    const passwordStep = $("#forgotPasswordStep");
    const emailForm = $("#forgotEmailForm");
    const otpForm = $("#forgotOtpForm");
    const passwordForm = $("#forgotPasswordForm");
    const message = $("#forgotPasswordMessage");
    if (!emailForm || !otpForm || !passwordForm) return;

    const phoneInput = $("#forgotPhone", emailForm);
    const otpInput = $("#forgotOtp", otpForm);
    const resetPassword = $("#resetPassword", passwordForm);
    const resetConfirm = $("#resetConfirmPassword", passwordForm);
    const phoneDisplay = $("#forgotPhoneDisplay");
    const verifiedPhoneDisplay = $("#forgotVerifiedPhone");
    const resendButton = $("#resendOtp");
    const changePhoneButton = $("#changeForgotPhone");
    const restartButton = $("#restartForgotPassword");

    const showForgotStep = (step) => {
        [emailStep, otpStep, passwordStep].forEach((item) => item?.classList.toggle("d-none", item !== step));
    };

    const clearForgotMessage = () => {
        if (!message) return;
        message.className = "confirmation-card";
        message.innerHTML = "";
    };

    const showOtpStep = async (phone) => {
        const otp = await createPasswordResetOtp(phone);
        if (phoneDisplay) phoneDisplay.textContent = phone;
        showForgotStep(otpStep);
        showAuthMessage(message, "success", "Code generated", `Demo OTP: ${otp}. Enter it below to continue.`);
    };

    const restartForgotPassword = () => {
        clearPasswordReset();
        emailForm.reset();
        otpForm.reset();
        passwordForm.reset();
        clearForgotMessage();
        showForgotStep(emailStep);
    };

    emailForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const normalizedPhone = phoneInput.value.trim();
        const phoneValid = /^[+\d][\d\s()-]{7,}$/.test(normalizedPhone);
        setFieldInvalid(phoneInput, !phoneValid);

        if (!phoneValid) {
            showAuthMessage(message, "error", "Check your phone number", "Enter a valid phone number with country code.");
            return;
        }

        const phoneDigits = normalizedPhone.replace(/\D/g, "");
        const user = getUsers().find((item) => String(item.phone || "").replace(/\D/g, "") === phoneDigits);
        if (!user) {
            showAuthMessage(message, "error", "Account not found", "No US.par account exists for this phone number.");
            return;
        }

        await showOtpStep(normalizedPhone);
    });

    otpForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const otp = otpInput.value.trim();
        const otpValid = /^\d{6}$/.test(otp);
        setFieldInvalid(otpInput, !otpValid);

        if (!otpValid) {
            showAuthMessage(message, "error", "Check the code", "Enter the 6-digit OTP from your email.");
            return;
        }

        const result = await verifyPasswordResetOtp(otp);
        if (!result.ok) {
            if (result.expired) restartForgotPassword();
            showAuthMessage(message, "error", result.expired ? "Start again" : "Incorrect OTP", result.message);
            return;
        }

        const record = getVerifiedPasswordReset();
        if (verifiedPhoneDisplay) verifiedPhoneDisplay.textContent = record?.phone || "";
        otpInput.value = "";
        showForgotStep(passwordStep);
        showAuthMessage(message, "success", "OTP verified", "Choose a new password to finish resetting your account.");
    });

    resendButton?.addEventListener("click", async () => {
        const record = getValidPasswordReset();
        const phone = record?.phone || phoneInput.value.trim();
        if (!phone) {
            showForgotStep(emailStep);
            return;
        }
        await showOtpStep(phone);
    });

    changePhoneButton?.addEventListener("click", restartForgotPassword);
    restartButton?.addEventListener("click", restartForgotPassword);

    passwordForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const password = resetPassword.value;
        const confirm = resetConfirm.value;
        const checks = {
            password: password.length >= 8,
            confirm: password === confirm && password.length > 0
        };

        Object.entries(checks).forEach(([key, valid]) => {
            const field = { password: resetPassword, confirm: resetConfirm }[key];
            setFieldInvalid(field, !valid);
        });

        if (!Object.values(checks).every(Boolean)) {
            showAuthMessage(message, "error", "Choose a stronger password", "Use at least 8 characters and make sure both passwords match.");
            return;
        }

        const record = getVerifiedPasswordReset();
        if (!record) {
            restartForgotPassword();
            showAuthMessage(message, "error", "Verification required", "Your OTP session expired. Request a new code to reset your password.");
            return;
        }

        const users = getUsers();
        const resetDigits = String(record.phone || "").replace(/\D/g, "");
        const userIndex = users.findIndex((user) => String(user.phone || "").replace(/\D/g, "") === resetDigits);
        if (userIndex === -1) {
            showAuthMessage(message, "error", "Account not found", "We could not find the account for this phone number.");
            return;
        }

        const passwordHash = await hashPassword(password);
        users[userIndex] = { ...users[userIndex], passwordHash };
        saveUsers(users);
        clearPasswordReset();
        showAuthMessage(message, "success", "Password updated", "Your password was reset successfully. Redirecting you to sign in.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 900);
    });

    const pendingReset = getValidPasswordReset();
    if (pendingReset?.verified) {
        if (verifiedPhoneDisplay) verifiedPhoneDisplay.textContent = pendingReset.phone;
        showForgotStep(passwordStep);
    } else if (pendingReset) {
        if (phoneDisplay) phoneDisplay.textContent = pendingReset.phone;
        showForgotStep(otpStep);
    }
}

function initPasswordToggles() {
    $$(".password-toggle").forEach((button) => {
        const input = document.getElementById(button.dataset.target);
        if (!input) return;
        button.addEventListener("click", () => {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            button.textContent = isPassword ? "Hide" : "Show";
            button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        });
    });
}

function initAuthNav() {
    const authLink = $("#navAuthLink");
    if (!authLink) return;

    const renderAuthLink = () => {
        const user = getSessionUser();
        const isLoginPage = window.location.pathname.endsWith("login.html");
        authLink.textContent = user ? "Logout" : "Login";
        authLink.title = user ? `Logout ${user.name}` : "Login to your account";
        authLink.classList.toggle("active", !user && isLoginPage);
    };

    authLink.addEventListener("click", (event) => {
        if (!getSessionUser()) return;
        event.preventDefault();
        clearSessionUser();
        renderAuthLink();
    });

    renderAuthLink();
}

async function initLoginPage() {
    const form = $("#loginForm");
    const message = $("#loginMessage");
    if (!form) return;

    const email = $("#loginEmail", form);
    const password = $("#loginPassword", form);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const passwordValid = Boolean(password.value);
        setFieldInvalid(email, !emailValid);
        setFieldInvalid(password, !passwordValid);

        if (!emailValid || !passwordValid) {
            showAuthMessage(message, "error", "Check your details", "Enter a valid email address and password.");
            return;
        }

        const passwordHash = await hashPassword(password.value);
        const user = getUsers().find((item) =>
            item.email.toLowerCase() === email.value.trim().toLowerCase() && item.passwordHash === passwordHash
        );

        if (!user) {
            showAuthMessage(message, "error", "Login failed", "Invalid email or password. Please try again.");
            return;
        }

        setSessionUser({ id: user.id, name: user.name, email: user.email });
        showAuthMessage(message, "success", "Welcome back", `Signed in as ${user.name}. Redirecting you now.`);
        setTimeout(() => {
            window.location.href = safeRedirectTarget();
        }, 900);
    });
}

function updatePasswordStrength() {
    const password = $("#signupPassword");
    const bar = $("#passwordStrength");
    const hint = $("#passwordHint");
    if (!password || !bar || !hint) return;

    const value = password.value;
    let score = 0;
    if (value.length >= 8) score += 1;
    if (value.length >= 12) score += 1;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
    bar.style.width = `${Math.min(100, score * 20)}%`;
    bar.style.background = score <= 2 ? "#c98d5f" : score <= 3 ? "#c69a5f" : "#0f766e";
    hint.textContent = value ? `Password strength: ${labels[score] || "Weak"}` : "Use at least 8 characters for a stronger password.";
}

async function initSignupPage() {
    const form = $("#signupForm");
    const message = $("#signupMessage");
    if (!form) return;

    const name = $("#signupName", form);
    const email = $("#signupEmail", form);
    const phone = $("#signupPhone", form);
    const password = $("#signupPassword", form);
    const confirm = $("#signupConfirm", form);
    const terms = $("#termsCheck", form);

    password?.addEventListener("input", updatePasswordStrength);
    updatePasswordStrength();

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const normalizedEmail = email.value.trim().toLowerCase();
        const checks = {
            name: Boolean(name.value.trim()),
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail),
            phone: /^[+\d][\d\s()-]{7,}$/.test(phone.value.trim()),
            password: password.value.length >= 8,
            confirm: password.value === confirm.value && password.value.length > 0,
            terms: Boolean(terms.checked)
        };

        Object.entries(checks).forEach(([key, valid]) => {
            const field = { name, email, phone, password, confirm, terms }[key];
            setFieldInvalid(field, !valid);
        });

        if (!Object.values(checks).every(Boolean)) {
            showAuthMessage(message, "error", "Almost there", "Please complete all fields with a valid phone number and stronger password.");
            return;
        }

        const existingUser = getUsers().find((user) => user.email.toLowerCase() === normalizedEmail);
        if (existingUser) {
            setFieldInvalid(email, true);
            showAuthMessage(message, "error", "Account exists", "An account with this email already exists. Try signing in instead.");
            return;
        }

        const passwordHash = await hashPassword(password.value);
        const user = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: name.value.trim(),
            email: normalizedEmail,
            phone: phone.value.trim(),
            passwordHash,
            createdAt: new Date().toISOString()
        };

        saveUsers([user, ...getUsers()]);
        setSessionUser({ id: user.id, name: user.name, email: user.email });
        showAuthMessage(message, "success", "Account created", `Welcome, ${user.name}. Redirecting you now.`);
        setTimeout(() => {
            window.location.href = safeRedirectTarget();
        }, 1000);
    });
}

const THEME_OPTIONS = [
    { id: "luxury", label: "Luxury" },
    { id: "fresh", label: "Fresh" }
];

function applyTheme(theme) {
    const selected = THEME_OPTIONS.some((option) => option.id === theme) ? theme : "luxury";
    document.documentElement.dataset.theme = selected;
    localStorage.setItem(THEME_STORAGE_KEY, selected);
    return selected;
}

function initThemeSwitcher() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "luxury";
    const activeTheme = applyTheme(savedTheme);
    const switcher = document.createElement("div");
    switcher.className = "theme-switcher";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Choose website theme");

    THEME_OPTIONS.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.theme = option.id;
        button.textContent = option.label;
        button.classList.toggle("active", option.id === activeTheme);
        button.addEventListener("click", () => {
            const nextTheme = applyTheme(option.id);
            $$(".theme-switcher button").forEach((item) => item.classList.toggle("active", item.dataset.theme === nextTheme));
        });
        switcher.appendChild(button);
    });

    document.body.appendChild(switcher);
}

function initDestinationSlideshow() {
    const slideshow = $("#destinationSlideshow");
    const destinationSelect = $("#destination");
    const heading = $("#slideshowHeading");
    const headingName = $("#slideshowDestinationName");
    if (!slideshow || !destinationSelect) return;

    let timer = null;
    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    const imageCache = new Map();
    let renderId = 0;

    const fetchDestinationImages = async (destination) => {
        if (imageCache.has(destination)) return imageCache.get(destination);
        const fallback = DESTINATION_PRIMARY_IMAGES[destination] ? [DESTINATION_PRIMARY_IMAGES[destination]] : [];
        const configured = DESTINATION_GALLERY_KEYWORDS[destination];
        const terms = Array.isArray(configured) ? configured : [configured || destination];
        try {
            const responses = await Promise.all(terms.map(async (term) => {
                const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size&iiurlwidth=1920&format=json&origin=*`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                return Object.values(data?.query?.pages || {});
            }));
            const pools = responses.map((pages) => pages
                .map((page) => page.imageinfo?.[0])
                .filter((info) => info?.thumburl && info.width >= 1600 && info.mime !== "image/svg+xml")
                .map((info) => info.thumburl));
            const limit = terms.length > 1 ? terms.length : 4;
            const images = [];
            const seen = new Set();
            const maxLength = Math.max(0, ...pools.map((pool) => pool.length));
            for (let i = 0; i < maxLength && images.length < limit; i += 1) {
                pools.forEach((pool) => {
                    const src = pool[i];
                    if (src && !seen.has(src) && images.length < limit) {
                        seen.add(src);
                        images.push(src);
                    }
                });
            }
            const result = images.length ? images : fallback;
            imageCache.set(destination, result);
            return result;
        } catch {
            imageCache.set(destination, fallback);
            return fallback;
        }
    };

    const render = async () => {
        const id = ++renderId;
        const destination = destinationSelect.value;
        const images = await fetchDestinationImages(destination);
        if (id !== renderId) return;
        if (heading) heading.hidden = !images.length;
        if (headingName) headingName.textContent = destination || "";
        stopTimer();
        slideshow.innerHTML = "";
        slideshow.hidden = !images.length;
        if (!images.length) return;

        const slides = images.map((src, index) => {
            const slide = document.createElement("div");
            slide.className = `slideshow-slide${index === 0 ? " is-active" : ""}`;
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${destination} view ${index + 1}`;
            img.loading = index === 0 ? "eager" : "lazy";
            slide.appendChild(img);
            return slide;
        });

        const dots = document.createElement("div");
        dots.className = "slideshow-dots";
        dots.setAttribute("aria-hidden", "true");

        let active = 0;
        const goTo = (next) => {
            active = (next + slides.length) % slides.length;
            slides.forEach((slide, index) => slide.classList.toggle("is-active", index === active));
            Array.from(dots.children).forEach((dot, index) => dot.classList.toggle("is-active", index === active));
        };

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = `slideshow-dot${index === 0 ? " is-active" : ""}`;
            dot.setAttribute("aria-label", `Show image ${index + 1}`);
            dot.addEventListener("click", () => goTo(index));
            dots.appendChild(dot);
        });

        slides.forEach((slide) => slideshow.appendChild(slide));
        slideshow.appendChild(dots);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            timer = setInterval(() => goTo(active + 1), 900);
        }
    };

    destinationSelect.addEventListener("change", render);
    render();
}

function initImageFollow() {
    if (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    $$(".travel-card").forEach((card) => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let frame = null;
        const maxX = 36;
        const maxY = 24;
        const ease = 0.14;

        const applyFollow = () => {
            card.style.setProperty("--follow-x", `${currentX.toFixed(1)}px`);
            card.style.setProperty("--follow-y", `${currentY.toFixed(1)}px`);
        };

        const tick = () => {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            if (Math.abs(targetX - currentX) < 0.15) currentX = targetX;
            if (Math.abs(targetY - currentY) < 0.15) currentY = targetY;
            applyFollow();
            frame = (currentX !== targetX || currentY !== targetY) ? requestAnimationFrame(tick) : null;
        };

        const ensureLoop = () => {
            if (!frame) frame = requestAnimationFrame(tick);
        };

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            targetX = x * maxX * 2;
            targetY = y * maxY * 2;
            ensureLoop();
            card.style.setProperty("--glare-x", `${((x + 0.5) * 100).toFixed(1)}%`);
            card.style.setProperty("--glare-y", `${((y + 0.5) * 100).toFixed(1)}%`);
            card.style.setProperty("--tilt-x", "0deg");
            card.style.setProperty("--tilt-y", `${(x < 0 ? x * 4 : 0).toFixed(2)}deg`);
        }, { passive: true });

        card.addEventListener("pointerleave", () => {
            targetX = 0;
            targetY = 0;
            ensureLoop();
            card.style.setProperty("--glare-x", "50%");
            card.style.setProperty("--glare-y", "50%");
            card.style.setProperty("--tilt-x", "0deg");
            card.style.setProperty("--tilt-y", "0deg");
        });
    });
}

function initSparkTrail() {
    if (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "spark-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let particles = [];
    let raf = null;
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;
    const SPARK_COLORS = ["244,223,169", "255,255,255", "255,150,200", "120,220,255", "180,255,170"];

    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const spawn = (x, y, burst = false) => {
        const count = burst ? 18 : 2;
        for (let i = 0; i < count; i += 1) {
            particles.push({
                x: x + (Math.random() * (burst ? 18 : 8) - (burst ? 9 : 4)),
                y: y + (Math.random() * (burst ? 18 : 8) - (burst ? 9 : 4)),
                vx: burst ? (Math.random() - 0.5) * 5 : (Math.random() - 0.5) * 1.6,
                vy: burst ? -Math.random() * 4 - 1 : -Math.random() * 1.8 - 0.4,
                life: 1,
                decay: burst ? 0.015 + Math.random() * 0.02 : 0.02 + Math.random() * 0.02,
                size: burst ? 1.5 + Math.random() * 3 : 1 + Math.random() * 2.2,
                color: burst ? SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)] : undefined
            });
        }
        if (particles.length > 260) particles.splice(0, particles.length - 260);
    };

    const draw = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.globalCompositeOperation = "lighter";
        particles = particles.filter((p) => p.life > 0);
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.life -= p.decay;
            const alpha = Math.max(p.life, 0);
            const s = p.size * (0.6 + alpha * 0.6);
            const rgb = p.color || "244,223,169";
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.85})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x - s, p.y);
            ctx.lineTo(p.x + s, p.y);
            ctx.moveTo(p.x, p.y - s);
            ctx.lineTo(p.x, p.y + s);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(p.x, p.y, s * 0.45, 0, Math.PI * 2);
            ctx.fill();
        });
        raf = particles.length ? requestAnimationFrame(draw) : null;
    };

    document.addEventListener("pointermove", (event) => {
        const now = performance.now();
        if (now - lastSpawn < 16) return;
        lastSpawn = now;
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        if (Math.hypot(dx, dy) < 2) return;
        spawn(event.clientX, event.clientY);
        if (!raf) raf = requestAnimationFrame(draw);
    }, { passive: true });

    document.addEventListener("click", (event) => {
        spawn(event.clientX, event.clientY, true);
        if (!raf) raf = requestAnimationFrame(draw);
    }, { passive: true });
}

function initChatbot() {
    if ($("#chatWidget")) return;

    const widget = document.createElement("div");
    widget.className = "chat-widget";
    widget.id = "chatWidget";
    widget.innerHTML = `
        <div class="chat-panel" id="chatPanel" role="dialog" aria-labelledby="chatTitle">
            <div class="chat-header">
                <div class="chat-header-text">
                    <strong id="chatTitle">US.par Guide</strong>
                    <span>Here to help with your journey</span>
                </div>
                <button type="button" class="chat-close" id="chatClose" aria-label="Close chat">×</button>
            </div>
            <div class="chat-messages" id="chatMessages" aria-live="polite"></div>
            <div class="chat-quick" id="chatQuick"></div>
            <form class="chat-form" id="chatForm">
                <input type="text" id="chatInput" placeholder="Ask about trips, bookings, or support" autocomplete="off" maxlength="500">
                <button type="submit">Send</button>
            </form>
        </div>
        <button type="button" class="chat-launcher" id="chatLauncher" aria-expanded="false" aria-controls="chatPanel" aria-label="Open chat assistant">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16l1.2-3.6A2 2 0 0 1 8.1 11h7.8a2 2 0 0 1 1.9 1.4L19 16"/><path d="M4 16h16v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V16z"/><circle cx="8" cy="19" r="1.3"/><circle cx="16" cy="19" r="1.3"/></svg>
        </button>`;

    const messages = $("#chatMessages", widget);
    const quickReplies = $("#chatQuick", widget);
    const form = $("#chatForm", widget);
    const input = $("#chatInput", widget);
    const launcher = $("#chatLauncher", widget);
    const closeButton = $("#chatClose", widget);

    const QUICK_REPLIES = [
        { label: "Where should I go?", query: "destination" },
        { label: "How do I book?", query: "book" },
        { label: "Pricing help", query: "price" },
        { label: "Login or signup", query: "login" },
        { label: "Contact support", query: "contact" },
        { label: "Reset password", query: "password" }
    ];

    const scrollToLatest = () => {
        messages.scrollTop = messages.scrollHeight;
    };

    const addMessage = (role, content, isHTML = false) => {
        const message = document.createElement("div");
        message.className = `chat-message chat-message--${role}`;
        if (isHTML) {
            message.innerHTML = content;
        } else {
            message.textContent = content;
        }
        messages.appendChild(message);
        scrollToLatest();
        return message;
    };

    const showTyping = () => {
        const typing = document.createElement("div");
        typing.className = "chat-message chat-message--bot chat-typing";
        typing.innerHTML = "<span></span><span></span><span></span>";
        messages.appendChild(typing);
        scrollToLatest();
        return typing;
    };

    const botReply = (html, delay) => {
        const wait = delay === undefined ? 550 + Math.floor(Math.random() * 350) : delay;
        const typing = showTyping();
        window.setTimeout(() => {
            typing.remove();
            addMessage("bot", html, true);
        }, wait);
    };

    const userSay = (text) => addMessage("user", text);

    const DESTINATION_ALIASES = {
        "new york": "New York",
        york: "New York",
        "rio de janeiro": "Rio de Janeiro",
        rio: "Rio de Janeiro",
        antarctica: "Antarctica",
        goa: "Goa",
        kerala: "Kerala",
        rajasthan: "Rajasthan",
        ladakh: "Ladakh",
        manali: "Manali",
        jaipur: "Jaipur",
        bali: "Bali",
        paris: "Paris",
        switzerland: "Switzerland",
        kenya: "Kenya",
        sydney: "Sydney"
    };

    const destinationAnswer = (q) => {
        for (const [alias, key] of Object.entries(DESTINATION_ALIASES)) {
            if (q.includes(alias)) return key;
        }
        return null;
    };

    const destinationHtml = (key) => {
        const price = DESTINATION_PRICES[key] ? formatINR(DESTINATION_PRICES[key]) : "custom";
        return `Great choice — ${key} is one of our curated escapes. Starting rates are around ${price} per person, and the final estimate depends on your dates and travellers. You can <a href="bookings.html?destination=${encodeURIComponent(key)}">start a booking for ${key}</a> or browse the full collection at <a href="destination.html">Destinations</a>.`;
    };

    const respond = (text) => {
        const q = text.toLowerCase();
        let html;

        if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q) || q.includes("hello")) {
            html = "Hello, and good day to you. I'm US.par Guide — I'm here to help with destinations, booking steps, pricing, account access, and support. Please tell me what you need, and I'll do my best to assist respectfully.";
        } else if (q.includes("thank")) {
            html = "You're very welcome. I'm glad I could help. If anything else comes up during your planning, please feel free to ask.";
        } else if (q.includes("bye") || q.includes("goodbye")) {
            html = "Goodbye, and safe travels. We'll be here whenever you need planning help again.";
        } else if (q.includes("rude") || q.includes("respect") || q.includes("sorry")) {
            html = "I sincerely apologize if anything felt unclear. My goal is to be helpful and respectful. Please let me know how I can assist you better.";
        } else if (q.includes("forgot") || q.includes("password") || q.includes("reset")) {
            html = `For password help, please use the secure reset page: <a href="forgot-password.html">Reset password</a>. Enter your registered phone number to receive a verification code, then choose a new password. If you need the code resent, the page can help with that too.`;
        } else if (q.includes("login") || q.includes("log in") || q.includes("sign in") || q.includes("signup") || q.includes("sign up") || q.includes("register") || q.includes("account")) {
            html = `You can sign in at <a href="login.html">Login</a>. If you do not have an account yet, please create one at <a href="signup.html">Sign up</a>. For password help, use <a href="forgot-password.html">Reset password</a>.`;
        } else if (q.includes("contact") || q.includes("support") || q.includes("human") || q.includes("agent") || q.includes("email") || q.includes("phone")) {
            html = `Of course — for personal assistance, please visit <a href="contact.html">Contact</a> or email hello@uspar.travel. Our concierge team is available Monday to Saturday, 10:00 AM to 7:00 PM IST. If you need help with an existing trip, please share your booking details so we can assist promptly.`;
        } else if (q.includes("cancel") || q.includes("refund") || q.includes("change")) {
            html = `For changes or cancellations, please contact our concierge team at <a href="contact.html">Contact</a> with your booking details. We'll review the request respectfully and explain the available options clearly.`;
        } else if (q.includes("theme") || q.includes("dark") || q.includes("light") || q.includes("colour") || q.includes("color")) {
            html = `You can switch themes using the buttons at the top-right of the page. Luxury is the default gold theme; Fresh and Neon are also available. Your choice is saved in this browser.`;
        } else if (q.includes("hour") || q.includes("open") || q.includes("time")) {
            html = `Our support hours are Monday to Saturday, 10:00 AM to 7:00 PM IST. For anything urgent, please use <a href="contact.html">Contact</a> and our team will respond as soon as possible.`;
        } else {
            const destination = destinationAnswer(q);
            if (destination) {
                html = destinationHtml(destination);
            } else if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("budget") || q.includes("cheap") || q.includes("expensive")) {
                html = `Pricing depends on the destination, travel dates, and number of travellers. Starting rates are shown on <a href="destination.html">Destinations</a>, and the <a href="bookings.html">Bookings page</a> gives an instant estimate before you confirm.`;
            } else if (q.includes("book") || q.includes("booking") || q.includes("reserve") || q.includes("ticket") || q.includes("itinerary")) {
                html = `Happy to help with booking. Please use the <a href="bookings.html">Bookings page</a> to choose a destination, dates, travellers, and travel style. It shows an instant estimate before you confirm, and you can review saved requests there too.`;
            } else if (q.includes("destination") || q.includes("where") || q.includes("place") || q.includes("travel") || q.includes("trip")) {
                if (q.includes("india")) {
                    html = `For India, popular starting points include Goa, Kerala, Rajasthan, Ladakh, Manali, and Jaipur. You can see current options and prices on <a href="destination.html">Destinations</a>, then book through <a href="bookings.html">Bookings</a>.`;
                } else {
                    html = `You can explore the full collection at <a href="destination.html">Destinations</a>. We feature Indian escapes first — Goa, Kerala, Rajasthan, Ladakh, Manali, and Jaipur — plus international journeys across Asia, Europe, Africa, the Americas, Oceania, and Antarctica. Tell me a place and I can point you to the right booking page.`;
                }
            } else if (q.includes("who") || q.includes("what") || q.includes("chale") || q.includes("chalo") || q.includes("about")) {
                html = `US.par is a travel booking experience for curated Indian and international journeys. We focus on transparent pricing, thoughtful itineraries, and concierge support from planning to travel.`;
            } else {
                html = `Thank you for your patience. I can help with destinations, booking steps, pricing, login or signup, password reset, theme settings, and contacting our team. Please choose a quick reply below or type your question.`;
            }
        }

        botReply(html);
    };

    const renderQuickReplies = () => {
        quickReplies.innerHTML = "";
        QUICK_REPLIES.forEach((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "chat-quick-btn";
            button.textContent = item.label;
            button.addEventListener("click", () => {
                userSay(item.label);
                respond(item.query);
            });
            quickReplies.appendChild(button);
        });
    };

    const openChat = () => {
        widget.classList.add("is-open");
        launcher.setAttribute("aria-expanded", "true");
        if (!messages.dataset.greeted) {
            messages.dataset.greeted = "true";
            window.setTimeout(() => {
                botReply("Hello, and good day to you. I'm US.par Guide — I'm here to help with destinations, booking steps, pricing, account access, and support. Please tell me what you need, and I'll do my best to assist respectfully.", 350);
            }, 250);
        }
        scrollToLatest();
        input.focus();
    };

    const closeChat = () => {
        widget.classList.remove("is-open");
        launcher.setAttribute("aria-expanded", "false");
    };

    launcher.addEventListener("click", () => {
        if (widget.classList.contains("is-open")) {
            closeChat();
        } else {
            openChat();
        }
    });

    closeButton.addEventListener("click", closeChat);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        userSay(text);
        input.value = "";
        respond(text);
    });

    document.addEventListener("click", (event) => {
        if (!widget.contains(event.target)) closeChat();
    });

    renderQuickReplies();
    document.body.appendChild(widget);
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    initNavbar();
    initReveal();
    initImageFollow();
    initSparkTrail();
    initCounters();
    initDestinationFilters();
    initBookingPage();
    initDestinationSlideshow();
    initContactForm();
    initPasswordToggles();
    initAuthNav();
    initLoginPage();
    initSignupPage();
    initForgotPasswordPage();
    initChatbot();
});
