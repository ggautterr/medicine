from client.models import Person, Genetics


def analysis(JSHSHIR_1, JSHSHIR_2):
    person1 = Person.objects.filter(JSHSHIR="30202994002550").first()
    person2 = Person.objects.filter(JSHSHIR="20808003001298").first()

    genetic_all = []
    for genetic in Genetics.objects.all():
        genetic_name = genetic.name

        m = person1.genotype.filter(genetics=genetic).first()
        n = person2.genotype.filter(genetics=genetic).first()

        appearance1 = list(m.appearance)
        appearance2 = list(n.appearance)

        q = []
        for i in appearance1:
            q.append(i + appearance2[0])
            q.append(i + appearance2[1])

        print(q)

        percentage = 0
        for i in q:
            if genetic.type.lower() * 2 == i:
                percentage += 1

        if percentage:
            genetic_all.append(
                {
                    "genetic_name": genetic_name,
                    "percentage": percentage / 4 * 100
                }
            )

    print(genetic_all)
