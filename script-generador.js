// Arrays de datos realistas para España
const surnames = [
    "García", "Rodríguez", "González", "Fernández", "López", "Martínez", 
    "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", 
    "Díaz", "Moreno", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro",
    "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano",
    "Blanco", "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz"
];

const names = {
    male: [
        "Antonio", "José", "Manuel", "Francisco", "David", "Juan", "Javier",
        "Daniel", "José Antonio", "José Luis", "Carlos", "Jesús", "Alejandro",
        "Miguel", "Rafael", "Pedro", "Ángel", "Sergio", "Fernando", "Luis"
    ],
    female: [
        "María", "Carmen", "Ana", "Isabel", "Dolores", "Pilar", "Joséfa",
        "Laura", "Cristina", "Marta", "Teresa", "Elena", "Beatriz", "Rosa",
        "Antonia", "Lucía", "Sara", "Paula", "Raquel", "Eva"
    ]
};

const cities = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga",
    "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba",
    "Valladolid", "Vigo", "Gijón", "Hospitalet", "Vitoria", "Granada"
];

const streets = [
    "Mayor", "Real", "Gran Vía", "Sol", "Alcalá", "Avenida de América",
    "Castellana", "Diagonal", "Rambla", "Colón", "Sierpes", "Plaza España",
    "Reina Mercedes", "San Juan", "Paseo del Parque", "Marqués de Larios"
];

const bankEntities = [
    { name: "Banco Santander", code: "0049" },
    { name: "BBVA", code: "0182" },
    { name: "CaixaBank", code: "2100" },
    { name: "Bankia", code: "2038" },
    { name: "Sabadell", code: "0081" },
    { name: "Bankinter", code: "0128" },
    { name: "Unicaja", code: "2103" },
    { name: "Ibercaja", code: "2085" }
];

// Función para calcular dígito de control DNI
function calculateDNICheckDigit(dniNumber) {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    return letters[dniNumber % 23];
}

// Función para validar número de cuenta (algoritmo español)
function calculateBankAccountDC(entidad, oficina, cuenta) {
    const weights1 = [4, 8, 5, 10, 9, 7, 3, 6];
    const weights2 = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
    
    let sum1 = 0;
    for (let i = 0; i < 8; i++) {
        sum1 += parseInt(entidad[i]) * weights1[i];
    }
    const dc1 = 11 - (sum1 % 11);
    
    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
        sum2 += parseInt(cuenta[i]) * weights2[i];
    }
    const dc2 = 11 - (sum2 % 11);
    
    return `${dc1 === 11 ? 0 : dc1 === 10 ? 1 : dc1}${dc2 === 11 ? 0 : dc2 === 10 ? 1 : dc2}`;
}

// Función para generar número de tarjeta válido (algoritmo Luhn)
function generateValidCardNumber() {
    let cardNumber = '4'; // Empieza con 4 para VISA
    for (let i = 0; i < 14; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }
    
    // Aplicar algoritmo Luhn
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return cardNumber + checkDigit;
}

// Función para generar datos realistas de DNI
function generateDNIData() {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const surname1 = surnames[Math.floor(Math.random() * surnames.length)];
    const surname2 = surnames[Math.floor(Math.random() * surnames.length)];
    const name = names[gender][Math.floor(Math.random() * names[gender].length)];
    
    // Fecha de nacimiento (entre 18 y 80 años)
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - Math.floor(Math.random() * (80 - 18 + 1)) - 18;
    const birthMonth = Math.floor(Math.random() * 12);
    const birthDay = Math.floor(Math.random() * 28) + 1;
    const birthdate = new Date(birthYear, birthMonth, birthDay);
    
    // Fecha de expedición (mínimo 18 años después del nacimiento)
    const minExpedition = new Date(birthdate);
    minExpedition.setFullYear(minExpedition.getFullYear() + 18);
    const maxExpedition = new Date();
    const expedition = new Date(minExpedition.getTime() + Math.random() * (maxExpedition.getTime() - minExpedition.getTime()));
    
    // Fecha de caducidad (10 años después de expedición)
    const expiry = new Date(expedition);
    expiry.setFullYear(expiry.getFullYear() + 10);
    
    // Número de DNI
    const dniNumber = Math.floor(Math.random() * 90000000) + 10000000;
    const dniLetter = calculateDNICheckDigit(dniNumber);
    
    // Lugar de nacimiento y domicilio
    const birthplace = cities[Math.floor(Math.random() * cities.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const streetNumber = Math.floor(Math.random() * 200) + 1;
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    // Número de soporte (formato: ABC 000000)
    const supportLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                          String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                          String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const supportNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    return {
        surname: `${surname1} ${surname2}`,
        name: name,
        gender: gender === 'male' ? 'HOMBRE' : 'MUJER',
        nationality: 'ESPAÑOLA',
        birthdate: birthdate.toLocaleDateString('es-ES'),
        birthplace: birthplace,
        address: `C/${street}, ${streetNumber}, ${city}`,
        expedition: expedition.toLocaleDateString('es-ES'),
        expiry: expiry.toLocaleDateString('es-ES'),
        dniNumber: `${dniNumber}${dniLetter}`,
        supportNumber: `${supportLetters} ${supportNumber}`
    };
}

// Función para generar datos bancarios realistas
function generateBankData(dniData) {
    const bank = bankEntities[Math.floor(Math.random() * bankEntities.length)];
    const branch = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const account = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    const dc = calculateBankAccountDC(bank.code, branch, account);
    
    // Fecha de expiración (3-5 años desde hoy)
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + Math.floor(Math.random() * 3) + 3);
    
    return {
        holder: `${dniData.name} ${dniData.surname.split(' ')[0]}`.toUpperCase(),
        number: generateValidCardNumber().replace(/(.{4})/g, '$1 ').trim(),
        expiry: `${String(expiry.getMonth() + 1).padStart(2, '0')}/${String(expiry.getFullYear()).slice(2)}`,
        cvv: String(Math.floor(Math.random() * 900) + 100),
        entity: bank.name,
        branch: branch,
        dc: dc,
        account: account
    };
}

// Función para actualizar la interfaz con los datos generados
function updateUI(dniData, bankData) {
    console.log("Actualizando UI con datos:", dniData, bankData); // Para debug
    
    // Actualizar datos del DNI
    document.getElementById('dniSurname').textContent = dniData.surname;
    document.getElementById('dniName').textContent = dniData.name;
    document.getElementById('dniGender').textContent = dniData.gender;
    document.getElementById('dniNationality').textContent = dniData.nationality;
    document.getElementById('dniBirthdate').textContent = dniData.birthdate;
    document.getElementById('dniBirthplace').textContent = dniData.birthplace;
    document.getElementById('dniAddress').textContent = dniData.address;
    document.getElementById('dniExpedition').textContent = dniData.expedition;
    document.getElementById('dniExpiry').textContent = dniData.expiry;
    document.getElementById('dniSupport').textContent = dniData.supportNumber;
    document.getElementById('dniNumberLarge').textContent = dniData.dniNumber;
    
    // Actualizar datos bancarios
    document.getElementById('cardHolder').textContent = bankData.holder;
    document.getElementById('cardNumber').textContent = bankData.number;
    document.getElementById('cardExpiry').textContent = bankData.expiry;
    document.getElementById('cardCvv').textContent = bankData.cvv;
    document.getElementById('bankEntity').textContent = bankData.entity;
    document.getElementById('bankBranch').textContent = bankData.branch;
    document.getElementById('bankDc').textContent = bankData.dc;
    document.getElementById('bankAccount').textContent = bankData.account;
    
    // Actualizar MRZ del DNI
    updateMRZData(dniData);
    
    // Manejar opciones de visualización
    handleDisplayOptions();
}

// Función para actualizar datos MRZ
function updateMRZData(dniData) {
    const dniNumber = dniData.dniNumber.slice(0, 8);
    const dniLetter = dniData.dniNumber.slice(8);
    const surname = dniData.surname.replace(' ', '<<').toUpperCase();
    const name = dniData.name.toUpperCase();
    
    // Primera línea MRZ
    document.getElementById('mrzSurname').textContent = 
        surname.padEnd(20, '<').substring(0, 20);
    
    // Segunda línea MRZ
    document.getElementById('mrzNumber').textContent = dniNumber;
    document.getElementById('mrzChecksum').textContent = 
        calculateMRZChecksum(dniNumber);
    document.getElementById('mrzBirthdate').textContent = 
        formatDateForMRZ(new Date(dniData.birthdate.split('/').reverse().join('-')));
    document.getElementById('mrzBirthChecksum').textContent = 
        calculateMRZChecksum(formatDateForMRZ(new Date(dniData.birthdate.split('/').reverse().join('-'))));
    document.getElementById('mrzGender').textContent = 
        dniData.gender === 'HOMBRE' ? 'M' : 'F';
    document.getElementById('mrzExpiry').textContent = 
        formatDateForMRZ(new Date(dniData.expiry.split('/').reverse().join('-')));
    document.getElementById('mrzExpiryChecksum').textContent = 
        calculateMRZChecksum(formatDateForMRZ(new Date(dniData.expiry.split('/').reverse().join('-'))));
}

// Función para calcular checksum MRZ
function calculateMRZChecksum(data) {
    const weights = [7, 3, 1];
    let sum = 0;
    
    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        let value;
        
        if (char === '<') {
            value = 0;
        } else if (char >= '0' && char <= '9') {
            value = parseInt(char);
        } else {
            value = char.charCodeAt(0) - 55;
        }
        
        sum += value * weights[i % 3];
    }
    
    return sum % 10;
}

// Función para formatear fecha para MRZ
function formatDateForMRZ(date) {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + month + day;
}

// Función para manejar opciones de visualización
function handleDisplayOptions() {
    const showCvv = document.getElementById('showCvv').checked;
    const showFullAccount = document.getElementById('showFullAccount').checked;
    
    // Mostrar/ocultar CVV
    const cvvElement = document.getElementById('cardCvv');
    if (!showCvv) {
        cvvElement.textContent = '***';
    }
    
    // Mostrar/ocultar cuenta completa
    const accountElement = document.getElementById('bankAccount');
    if (!showFullAccount && accountElement.textContent !== '-') {
        accountElement.textContent = '•••• •••• •••• ' + accountElement.textContent.slice(-4);
    }
}

// Función para limpiar la interfaz
function clearUI() {
    // Limpiar datos del DNI
    document.getElementById('dniSurname').textContent = '-';
    document.getElementById('dniName').textContent = '-';
    document.getElementById('dniGender').textContent = '-';
    document.getElementById('dniNationality').textContent = '-';
    document.getElementById('dniBirthdate').textContent = '-';
    document.getElementById('dniBirthplace').textContent = '-';
    document.getElementById('dniAddress').textContent = '-';
    document.getElementById('dniExpedition').textContent = '-';
    document.getElementById('dniExpiry').textContent = '-';
    document.getElementById('dniSupport').textContent = '-';
    document.getElementById('dniNumberLarge').textContent = '00000000';
    
    // Limpiar datos bancarios
    document.getElementById('cardHolder').textContent = '-';
    document.getElementById('cardNumber').textContent = '**** **** **** ****';
    document.getElementById('cardExpiry').textContent = 'MM/AA';
    document.getElementById('cardCvv').textContent = '***';
    document.getElementById('bankEntity').textContent = '-';
    document.getElementById('bankBranch').textContent = '-';
    document.getElementById('bankDc').textContent = '-';
    document.getElementById('bankAccount').textContent = '-';
    
    // Limpiar MRZ
    document.getElementById('mrzSurname').textContent = 'XXXXXXXXXXXXXXXXXXXX';
    document.getElementById('mrzNumber').textContent = '00000000';
    document.getElementById('mrzChecksum').textContent = '0';
    document.getElementById('mrzBirthdate').textContent = '000000';
    document.getElementById('mrzBirthChecksum').textContent = '0';
    document.getElementById('mrzGender').textContent = 'X';
    document.getElementById('mrzExpiry').textContent = '000000';
    document.getElementById('mrzExpiryChecksum').textContent = '0';
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, inicializando..."); // Para debug
    
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const showCvvCheckbox = document.getElementById('showCvv');
    const showFullAccountCheckbox = document.getElementById('showFullAccount');
    
    // Verificar que los elementos existen
    if (!generateBtn || !clearBtn) {
        console.error("No se encontraron los botones necesarios");
        return;
    }
    
    // Event listener para generar datos
    generateBtn.addEventListener('click', function() {
        console.log("Botón Generar clickeado"); // Para debug
        try {
            const dniData = generateDNIData();
            const bankData = generateBankData(dniData);
            updateUI(dniData, bankData);
        } catch (error) {
            console.error("Error al generar datos:", error);
        }
    });
    
    // Event listener para limpiar
    clearBtn.addEventListener('click', function() {
        console.log("Botón Limpiar clickeado"); // Para debug
        clearUI();
    });
    
    // Event listeners para opciones
    showCvvCheckbox.addEventListener('change', handleDisplayOptions);
    showFullAccountCheckbox.addEventListener('change', handleDisplayOptions);
    
    // Generar datos automáticamente al cargar la página
    console.log("Generando datos iniciales..."); // Para debug
    try {
        const dniData = generateDNIData();
        const bankData = generateBankData(dniData);
        updateUI(dniData, bankData);
    } catch (error) {
        console.error("Error al generar datos iniciales:", error);
    }
});