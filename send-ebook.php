<?php
header('Content-Type: application/json');

// Konfigurace
$ebook_path = 'ebooks/pruvodce-pronajmem-2025.pdf';
$email_from = 'info@problemovynajemce.cz';
$email_from_name = 'Průvodce pronájmem';

// Kontrola metody
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Neplatná metoda']);
    exit;
}

// Získání dat z formuláře
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$gdpr = filter_input(INPUT_POST, 'gdpr', FILTER_SANITIZE_STRING);

// Validace
if (!$name || !$email || !$gdpr || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Neplatná data']);
    exit;
}

// Vytvoření odkazu pro stažení (v praxi by měl být unikátní a časově omezený)
$download_link = 'https://problemovynajemce.cz/' . $ebook_path;

// Příprava e-mailu
$subject = 'Váš e-book: Kompletní průvodce pronájmem 2025';
$headers = [
    'From' => $email_from_name . ' <' . $email_from . '>',
    'Reply-To' => $email_from,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/html; charset=UTF-8'
];

$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
        <h1 style='color: #1a1a1a;'>Děkujeme za stažení e-booku!</h1>
        
        <p>Vážený/á {$name},</p>
        
        <p>děkujeme za Váš zájem o náš e-book <strong>Kompletní průvodce pronájmem 2025</strong>.</p>
        
        <p>Pro stažení e-booku klikněte na následující tlačítko:</p>
        
        <p style='text-align: center; margin: 30px 0;'>
            <a href='{$download_link}' 
               style='background-color: #1a1a1a; 
                      color: white; 
                      padding: 12px 25px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block;'>
                Stáhnout e-book
            </a>
        </p>
        
        <p>Pokud máte jakékoliv dotazy, neváhejte nás kontaktovat.</p>
        
        <p>S přáním hezkého dne,<br>
        Tým Průvodce pronájmem</p>
        
        <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
        
        <p style='font-size: 12px; color: #666;'>
            Tento e-mail jste obdrželi na základě vyplnění formuláře na webu problemovynajemce.cz
        </p>
    </div>
</body>
</html>
";

// Odeslání e-mailu
$mail_sent = mail($email, $subject, $message, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'success' => true,
        'message' => 'E-book byl úspěšně odeslán na váš e-mail'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Nepodařilo se odeslat e-mail'
    ]);
}
