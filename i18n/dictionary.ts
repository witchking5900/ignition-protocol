export const dict = {
  en: {
    title: "IGNITION PROTOCOL: TISSUE DEFENSE",
    metrics: { pathogen: "PATHOGEN LOAD", permeability: "VASCULAR PERMEABILITY", leukocytes: "LEUKOCYTE SWARM", tissue: "TISSUE INTEGRITY" },
    pharma: { title: "PHARMACOLOGICAL OVERRIDES", nsaid: "DEPLOY NSAID", nsaidDesc: "COX-Inhibitor. Freezes collateral tissue damage for 15s.", steroid: "DEPLOY CORTICOSTEROID", steroidDesc: "Forces vascular closure & suppresses leukocyte swarm.", empty: "DEPLETED", active: "ACTIVE" },
    complement: { 
      title: "MAC WORKBENCH (DRAG & DROP)", 
      desc: "Analyze telemetry. Construct the C5b-C9 pore. NO HINTS PROVIDED.", 
      deployed: "MAC DEPLOYED: Humoral strike successful.", 
      unavailable: "CASCADE DEPLETED",
      dropZone: "DROP PROTEINS HERE TO ASSEMBLE CASCADE",
      clueLPS: "TELEMETRY CLUE: High titers of surface Lipopolysaccharide (LPS). Patient is immunologically naive.",
      clueMANNOSE: "TELEMETRY CLUE: Abundant terminal Mannose residues detected on pathogen cell wall.",
      clueANTIBODY: "TELEMETRY CLUE: Pre-existing IgG/IgM antibodies have bound to pathogen surface."
    },
    phase1: { title: "PHASE 1: VASCULAR BREACH", warning: "PATHOGEN DETECTED. Resident macrophages are awaiting orders to release Histamine and Cytokines.", action: "RELEASE HISTAMINE (+25% Permeability)", clinicalSigns: "CLINICAL SIGNS DETECTED: Rubor (Redness), Tumor (Swelling), Calor (Heat)", success: "GATES OPEN. Vascular permeability optimal. Proceeding to Phase 2..." },
    phase2: { title: "PHASE 2: LEUKOCYTE CASCADE", warning: "TACTICAL ADVICE: Activate adhesion molecules in sequence. Skipping steps causes leukocyte washout.", step1: "1. SELECTINS (Rolling)", step2: "2. INTEGRINS (Firm Adhesion)", step3: "3. PECAM-1 (Diapedesis)", errorWashout: "SEQUENCE ERROR: Neutrophils washed away! Pathogen load spiking!", success: "CASCADE COMPLETE: Swarm deployed into tissue.", awaiting: "Awaiting sequence initiation..." },
    phase3: { title: "PHASE 3: RESOLUTION VS. RUIN", warning: "PRIMARY THREAT NEUTRALIZED. You must now manage the cleanup. Choose your biological response carefully.", choiceA: "CHOICE A: Maintain Pro-inflammatory Cytokines", choiceB: "CHOICE B: Release IL-10 & TGF-beta (Macrophage Cleanup)" },
    debrief: { 
      title: "POST-ACTION MEDICAL REPORT", 
      grade: "FINAL GRADE", 
      evaluation: "CLINICAL EVALUATION", 
      gradeA: "Restitutio ad integrum. Cellular and Humoral systems perfectly synchronized.", 
      gradeNoMac: "Incomplete Response. Tissue preserved, but Humoral Immunity (MAC) was entirely neglected. Pathogen clearance delayed.",
      gradeB: "Resolution with mild fibroplasia. Moderate tissue scarring detected.", 
      gradeC: "Severe fibrosis (sclerosis). Partial loss of organ function.", 
      gradeF: "Extensive necrosis. Irreversible organ failure." 
    },
    gameOver: { title: "FLATLINE", subtitle: "TISSUE INTEGRITY REACHED 0%.", reason: "Catastrophic organ failure due to unmitigated collateral damage and pathogen proliferation.", restart: "INITIALIZE NEW PATIENT" },
    lore: {
      histamine: "A vasoactive amine stored in mast cell granules. Causes vasodilation and increased venular permeability.",
      diapedesis: "The transmigration of leukocytes squeezing between endothelial junctions to exit the blood vessel into peripheral tissue.",
      opsonization: "Coating of microbes with serum factors (like C3b or IgG) to enhance phagocyte recognition and ingestion.",
      mac: "Membrane Attack Complex (C5b-C9). Punctures the target cell's lipid bilayer forming a transmembrane channel, causing lethal cell lysis."
    }
  },
  ka: {
    title: "ანთების პროტოკოლი: ქსოვილის დაცვა",
    metrics: { pathogen: "პათოგენური აგენტის დატვირთვა", permeability: "სისხლძარღვთა განვლადობა", leukocytes: "ლეიკოციტების დაგროვება", tissue: "ქსოვილის მთლიანობა" },
    pharma: { title: "ფარმაკოლოგიური ჩარევა", nsaid: "ასას", nsaidDesc: "COX-ინჰიბიტორი. აჩერებს ქსოვილის დაზიანებას 15 წმ-ით.", steroid: "კორტიკოსტეროიდი", steroidDesc: "ხურავს სისხლძარღვებს და თრგუნავს ლეიკოციტების ემიგრაციას.", empty: "ამოწურულია", active: "აქტიურია" },
    complement: { 
      title: "MAC ლაბორატორია (DRAG & DROP)", 
      desc: "გაანალიზეთ ტელემეტრია. ააწყვეთ C5b-C9 ფორა. მინიშნებების გარეშე.", 
      deployed: "MAC აქტიურია: სამიზნე განადგურდა.", 
      unavailable: "სისტემა ამოწურულია",
      dropZone: "კასკადის ასაწყობად ჩასვით ცილები აქ",
      clueLPS: "ტელემეტრია: ზედაპირზე ფიქსირდება ლიპოპოლისაქარიდი (LPS). პაციენტი იმუნოლოგიურად ნაივია.",
      clueMANNOSE: "ტელემეტრია: პათოგენის კედელზე ფიქსირდება მანოზას ნარჩენები.",
      clueANTIBODY: "ტელემეტრია: IgG/IgM ანტისხეულები უკვე დაკავშირებულია პათოგენთან."
    },
    phase1: { title: "ფაზა 1: სისხლძარღვოვანი რეაქცია", warning: "პათოგენი აღმოჩენილია. მაკროფაგები ელიან ბრძანებას ჰისტამინის და ციტოკინების გამოსაყოფად.", action: "ჰისტამინის გამოყოფა (+25% განვლადობა)", clinicalSigns: "კლინიკური ნიშნები: სიწითლე (Rubor), შესივება-შეშუპება (Tumor), ტემპერატურის მომატება (Calor)", success: "კარიბჭე ღიაა. სისხლძარღვთა განვლადობის ზრდა ოპტიმალურია. გადავდივართ ფაზა 2-ზე..." },
    phase2: { title: "ფაზა 2: ლეიკოციტების ემიგრაცია", warning: "ტაქტიკური რჩევა: გააქტიურეთ ადჰეზიური მოლეკულები თანმიმდევრობით. გამოტოვება გამოიწვევს ჩამორეცხვას.", step1: "1. სელექტინები (მარგინაცია)", step2: "2. ინტეგრინები (ადჰეზია)", step3: "3. PECAM-1 (ემიგრაცია)", errorWashout: "შეცდომა: ნეიტროფილები ჩამოირეცხა! პათოგენური აგენტი მრავლდება!", success: "ემიგრაცია დასრულებულია: ნეიტროფილები ქსოვილშია.", awaiting: "მოლოდინის რეჟიმი..." },
    phase3: { title: "ფაზა 3: გამოსავალი", warning: "საფრთხე განეიტრალებულია. მართეთ დასუფთავება. აირჩიეთ ბიოლოგიური პასუხი ფრთხილად.", choiceA: "არჩევანი A: მედიატორების და ციტოკინების შენარჩუნება", choiceB: "არჩევანი B: მაკროფაგების მიერ ფაგოციტოზის გააქტივება" },
    debrief: { 
      title: "პოსტ-ფაქტუმ სამედიცინო ანგარიში", 
      grade: "საბოლოო შეფასება", 
      evaluation: "კლინიკური დასკვნა", 
      gradeA: "იდეალური აღდგენა (Restitutio ad integrum). უჯრედული და ჰუმორული სისტემები სინქრონიზებულია.", 
      gradeNoMac: "არასრული პასუხი. ქსოვილი შენარჩუნებულია, მაგრამ ჰუმორული იმუნიტეტი (MAC) იგნორირებული იყო. პათოგენის კლირენსი შეფერხდა.",
      gradeB: "რეზოლუცია მსუბუქი ფიბროპლაზიით. ზომიერი ნაწიბუროვანი ქსოვილი.", 
      gradeC: "მძიმე ფიბროზი (სკლეროზი). ფუნქციის ნაწილობრივი მოშლა.", 
      gradeF: "ფართო ნეკროზი. შეუქცევადი ორგანოს უკმარისობა." 
    },
    gameOver: { title: "სიკვდილი", subtitle: "ქსოვილის მთლიანობა 0%.", reason: "ორგანოს შეუქცევადი უკმარისობა ქსოვილების ტოტალური ნეკროზის გამო.", restart: "ახალი პაციენტის მიღება" },
    lore: {
      histamine: "ვაზოაქტიური ამინი, ინახება პოხიერი უჯრედების გრანულებში. იწვევს ვაზოდილატაციას და ვენულების განვლადობის მომატებას.",
      diapedesis: "სისხლძარღვის კედელზე მიმაგრებული ლეიკოციტების ემიგრაცია პერივასკულურ ქსოვილებში ენდოთელურ უჯრედებს შორის არსებული ხვრელებით.",
      opsonization: "მიკრობების 'შემოსვა' შრატისმიერი ფაქტორებით (ოპსონინებით, მაგ. IgG და C3b) ფაგოციტოზის გასაადვილებლად.",
      mac: "მემბრანის დამშლელი კომპლექსი (C5b-C9). ინერგება ფოსფოლიპიდურ გარსში, ქმნის ტრანსმემბრანულ არხს და იწვევს უჯრედის ლიზისს."
    }
  }
};

export type Language = 'en' | 'ka';
export type LoreKey = keyof typeof dict.en.lore;